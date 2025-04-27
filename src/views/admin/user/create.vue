<template>
  <div class="content-wrapper p-5">
    <h2>Create New User</h2>
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
          <input
            type="password"
            id="password"
            v-model="user.password"
            class="form-control"
            required
          />
          <div v-if="errors.password" class="text-danger mt-1">{{ errors.password }}</div>
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
        </div>
      </div>

      <div v-if="errors.general" class="text-danger mb-3">{{ errors.general }}</div>

      <div class="d-flex gap-2 mt-4">
        <button type="submit" class="btn btn-primary">Create User</button>
        <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { $http } from '@/plugins/http-wrapper'

const router = useRouter()
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

onMounted(async () => {
  try {
    const response = await $http.get('/roles/index')
    roles.value = response
  } catch (error) {
    console.error('Failed to fetch roles:', error)
  }
})

function handleFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    console.log('Selected file:', file)
    user.avatar = file
  }
}

async function handleSubmit() {
  // Clear previous errors
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
  if (!user.mobileNumber) {
    errors.mobileNumber = 'Mobile number is required.'
    hasError = true
  }
  if (user.mobileNumber < 10) {
    errors.duration = 'Mobile number must be 10 numbers.'
    hasError = true
  }
  if (!user.password) {
    errors.password = 'Password is required.'
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
    password: user.password,
    balance: Number(user.balance),
    roleId: Number(selectedRole.value),
  }

  const formData = new FormData()
  const userBlob = new Blob([JSON.stringify(userDTO)], { type: 'application/json' })
  formData.append('userDTO', userBlob, '') // Append with empty filename
  if (user.avatar) {
    formData.append('imageFile', user.avatar)
  }

  // Debug log FormData contents
  for (const pair of formData.entries()) {
    console.log(pair[0] + ':', pair[1])
  }

  try {
    const savedUser = await $http.post('/users/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    alert('User created successfully!')
    router.push({ name: 'UserList' }) // make sure this route exists
  } catch (error) {
    errors.general = 'Failed to create user: ' + error.message
  }
}

function cancel() {
  router.push({ name: 'UserList' })
}
</script>

<style scoped>
@import '@/assets/css/adminlte.css';

.container {
  max-width: 600px;
}
</style>
