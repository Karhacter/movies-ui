<template>
  <div class="change-password-container mt-3">
    <h2 class="text-dark">Đổi Mật Khẩu</h2>
    <form @submit.prevent="handleChangePassword">
      <div class="form-group">
        <label for="oldPassword">Mật khẩu cũ</label>
        <input
          type="password"
          id="oldPassword"
          v-model="oldPassword"
          required
          autocomplete="current-password"
        />
      </div>

      <div class="form-group">
        <label for="newPassword">Mật khẩu mới</label>
        <input
          type="password"
          id="newPassword"
          v-model="newPassword"
          required
          autocomplete="new-password"
        />
      </div>

      <div class="form-group">
        <label for="confirmNewPassword">Xác nhận mật khẩu mới</label>
        <input
          type="password"
          id="confirmNewPassword"
          v-model="confirmNewPassword"
          required
          autocomplete="new-password"
        />
      </div>

      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>

      <button type="submit" :disabled="loading || !userID">
        {{ loading ? 'Changing...' : 'Change Password' }}
      </button>
    </form>
  </div>
</template>

<script>
import { $http } from '@/plugins/http-wrapper'

export default {
  name: 'ChangePassword',
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      errorMessage: '',
      successMessage: '',
      loading: false,
      userID: null,
    }
  },
  mounted() {
    this.fetchUserInfor()
  },
  methods: {
    async fetchUserInfor() {
      try {
        const res = await $http.get('/auth/userinfo')
        if (res) {
          this.userID = res.userID
          return res.userID
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
      return null
    },
    async handleChangePassword() {
      this.errorMessage = ''
      this.successMessage = ''

      if (this.newPassword !== this.confirmNewPassword) {
        this.errorMessage = 'New password and confirmation do not match.'
        return
      }

      if (!this.userID) {
        this.errorMessage = 'User ID not found. Please login again.'
        return
      }

      this.loading = true
      try {
        const payload = {
          userId: this.userID,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        }
        console.log('Change password payload:', payload)

        const response = await $http.post('/users/change-password', payload)
        this.successMessage = response.message || 'Password has been changed successfully.'
        this.oldPassword = ''
        this.newPassword = ''
        this.confirmNewPassword = ''
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response
        } else {
          this.errorMessage = 'Mật Khẩu Cũ Không Đúng'
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.change-password-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 6px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 600;
}

input[type='password'] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  border: none;
  color: white;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  margin-bottom: 1rem;
  font-weight: 600;
}

.success-message {
  color: #28a745;
  margin-bottom: 1rem;
  font-weight: 600;
}
</style>
