<template>
  <div class="content-wrapper p-5">
    <div class="user-detail table-responsive">
      <h1 class="text-danger">Thông Tin User</h1>
      <div class="text-end mb-4">
        <router-link to="/admin/user" class="btn btn-sm btn-info">
          <i class="fa fa-arrow-left"></i> Về Danh Sách
        </router-link>
      </div>

      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="!user && !error" class="loading">Loading user details...</div>

      <div v-if="user" class="user-card">
        <div class="avatar-container">
          <img :src="getImage(user.avatar)" alt="User Avatar" class="user-avatar" />
        </div>
        <div class="user-info two-column pt-4">
          <div class="info-item"><strong>Name:</strong> {{ user.name }}</div>
          <div class="info-item"><strong>Email:</strong> {{ user.email }}</div>
          <div class="info-item"><strong>Mobile Number:</strong> {{ user.mobileNumber }}</div>
          <div class="info-item"><strong>Balance:</strong> {{ user.balance }} VND</div>
          <div class="info-item">
            <strong>Status:</strong> {{ user.statusDelete === 1 ? 'Active' : 'Deleted' }}
          </div>
          <div class="info-item"><strong>Created At:</strong> {{ formatDate(user.createdAt) }}</div>
          <div class="info-item"><strong>Roles:</strong> {{ user.roleIds.join(', ') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { $http } from '@/plugins/http-wrapper'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'AdminUserDetail',
  methods: {
    getImage(imageName) {
      if (!imageName) return ''
      return `${process.env.VITE_API_URL}${imageName.startsWith('/') ? '' : '/'}${imageName}`
    },
  },
  setup() {
    const route = useRoute()
    const userId = route.params.id
    const user = ref(null)
    const error = ref(null)

    const fetchUser = async () => {
      console.log('Fetching user detail for ID:', userId)
      error.value = null
      try {
        const response = await $http.get(`users/detail/id/${userId}`)
        console.log('API response:', response)
        user.value = response
      } catch (err) {
        console.error('Error fetching user detail:', err)
        error.value = 'Failed to load user details.'
      }
    }

    const formatDate = (dateStr) => {
      const date = new Date(dateStr)
      return date.toLocaleDateString()
    }

    onMounted(() => {
      fetchUser()
    })

    return {
      user,
      error,
      formatDate,
    }
  },
}
</script>

<style scoped>
@import '@/assets/css/adminlte.css';

.user-avatar {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-top: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.avatar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.user-info {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 12px 40px;
}

.info-item {
  display: flex;
  align-items: center;
}

.info-item strong {
  color: #007bff;
  width: 120px;
  flex-shrink: 0;
}

.user-detail {
  padding: 50px;
  margin: 0 20px 0 0;
  max-width: auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
}

.loading,
.error {
  font-size: 1.2em;
  color: #888;
  text-align: center;
  margin: 30px 0;
  font-weight: 500;
}

.user-card {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.user-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.user-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #222;
  border-bottom: 2px solid #007bff;
  padding-bottom: 8px;
}

.user-content {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.user-poster {
  width: 200px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.user-poster:hover {
  transform: scale(1.05);
}

.user-details {
  flex: 1;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
}

.user-details p {
  margin: 12px 0;
}

.user-details strong {
  color: #007bff;
}
</style>
