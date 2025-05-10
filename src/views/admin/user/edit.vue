<template>
  <div class="content-wrapper p-5">
    <h2 class="text-warning">Edit User</h2>
    <form @submit.prevent="handleSubmit" novalidate style="margin-bottom: 100px">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" id="name" v-model="user.name" class="form-control" required />
          <div v-if="errors.name" class="text-danger mt-1">{{ errors.name }}</div>
        </div>

        <div class="col-md-6 mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" v-model="user.email" class="form-control" required />
          <div v-if="errors.email" class="text-danger mt-1">{{ errors.email }}</div>
        </div>

        <div class="col-md-6 mb-3">
          <label for="mobileNumber" class="form-label">Mobile Number</label>
          <input
            type="text"
            id="mobileNumber"
            v-model="user.mobileNumber"
            class="form-control"
            required
          />
          <div v-if="errors.mobileNumber" class="text-danger mt-1">{{ errors.mobileNumber }}</div>
        </div>

        <div class="col-md-6 mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" id="password" v-model="user.password" class="form-control" />
          <div v-if="errors.password" class="text-danger mt-1">{{ errors.password }}</div>
          <small class="form-text text-muted">Leave blank to keep current password</small>
        </div>

        <div class="col-md-6 mb-3">
          <label for="balance" class="form-label">Balance</label>
          <input
            type="number"
            id="balance"
            v-model="user.balance"
            class="form-control"
            required
            min="0"
          />
          <div v-if="errors.balance" class="text-danger mt-1">{{ errors.balance }}</div>
        </div>

        <div class="col-md-6 mb-3">
          <label for="role" class="form-label">Role</label>
          <select id="role" v-model="selectedRole" class="form-select" required>
            <option value="" disabled>Select a role</option>
            <option v-for="role in roles" :key="role.role_id" :value="role.roleStatus">
              {{ role.roleName }}
            </option>
          </select>
          <div v-if="errors.role" class="text-danger mt-1">{{ errors.role }}</div>
        </div>

        <div class="col-md-6 mb-3">
          <label for="avatar" class="form-label">Avatar Image</label>
          <input
            type="file"
            id="avatar"
            @change="handleFileChange"
            class="form-control"
            accept="image/*"
          />
          <div v-if="avatarPreview" class="mt-2">
            <strong>Selected Avatar Preview:</strong><br />
            <img
              :src="avatarPreview"
              alt="Selected Avatar Preview"
              style="max-width: 200px; border-radius: 8px"
            />
          </div>
          <div v-else-if="currentAvatar" class="mt-2">
            <strong>Current Avatar:</strong><br />
            <img
              :src="getImage(currentAvatar)"
              alt="Current Avatar"
              style="max-width: 200px; border-radius: 8px"
            />
          </div>
        </div>
      </div>

      <div v-if="errors.general" class="text-danger mb-3">{{ errors.general }}</div>

      <div class="d-flex gap-2 mt-4">
        <button type="submit" class="btn btn-primary">Update User</button>
        <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { $http } from '@/plugins/http-wrapper'

const router = useRouter()
const route = useRoute()
const errors = reactive({})
const user = reactive({
  name: '',
  email: '',
  mobileNumber: '',
  password: '',
  balance: '',
  roleIds: '',
})
const roles = ref([])
const selectedRole = ref('')
const currentAvatar = ref(null)
const avatarFile = ref(null)
const avatarPreview = ref(null)

onMounted(async () => {
  try {
    const response = await $http.get('/roles/index')
    roles.value = response
  } catch (error) {
    console.error('Failed to fetch roles:', error)
  }
  await fetchUserDetail()
})

async function fetchUserDetail() {
  try {
    const userId = route.params.id
    const res = await $http.get(`/users/detail/id/${userId}`)
    if (res) {
      console.log(res)
      user.name = res.name
      user.email = res.email
      user.mobileNumber = res.mobileNumber
      user.balance = res.balance
      selectedRole.value = res.roleIds.join(', ') || ''
      currentAvatar.value = res.avatar || null
    }
  } catch (error) {
    errors.general = 'Failed to load user details: ' + error.message
  }
}

function handleFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    avatarFile.value = file
    if (avatarPreview.value) {
      URL.revokeObjectURL(avatarPreview.value)
    }
    avatarPreview.value = URL.createObjectURL(file)
  }
}

async function handleSubmit() {
  Object.keys(errors).forEach((key) => delete errors[key])

  let hasError = false
  if (!user.name) {
    errors.name = 'Name is required.'
    hasError = true
  }
  if (!user.email) {
    errors.email = 'Email is required.'
    hasError = true
  }
  if (user.mobileNumber.length < 10) {
    errors.mobileNumber = 'Mobile number must be 10 numbers.'
    hasError = true
  }
  if (user.balance === '' || user.balance < 0) {
    errors.balance = 'Balance must be zero or positive.'
    hasError = true
  }
  if (!selectedRole.value) {
    errors.role = 'Role is required.'
    hasError = true
  }

  if (hasError) return

  const userDTO = {
    name: user.name,
    email: user.email,
    mobileNumber: user.mobileNumber,
    password: user.password || undefined, // optional password update
    balance: Number(user.balance),
    roleId: Number(selectedRole.value),
  }

  const formData = new FormData()
  const userBlob = new Blob([JSON.stringify(userDTO)], { type: 'application/json' })
  formData.append('userDTO', userBlob, '')
  if (avatarFile.value) {
    formData.append('imageFile', avatarFile.value)
  }

  try {
    await $http.put(`/users/update/${route.params.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    alert('User updated successfully!')
    router.push({ name: 'UserList' })
  } catch (error) {
    console.log('Error response data:', error.response ? error.response.data : error)
    // Check if error response indicates email already exists
    const errorData = error.response && error.response.data
    const msg = ((errorData && (errorData.message || errorData.error)) || '').toLowerCase()
    if (msg.includes('email') && msg.includes('exist')) {
      errors.email = 'Email already exists.'
      errors.general = ''
    } else {
      errors.general = msg || 'Failed to update user. Please try again later.'
    }
  }
}

function cancel() {
  router.push({ name: 'UserList' })
}

function getImage(imageName) {
  if (!imageName) return ''
  return `http://localhost:8080${imageName.startsWith('/') ? '' : '/'}${imageName}`
}
</script>

<style scoped>
@import '@/assets/css/adminlte.css';

.container {
  max-width: 600px;
}
</style>
