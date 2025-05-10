<template>
  <div class="forgot-password-container mt-3">
    <h2 class="text-dark">QUÊN MẬT KHẨU</h2>
    <form @submit.prevent="submitForgotPassword">
      <div class="form-group">
        <label for="email">Email Address</label>
        <input id="email" type="email" v-model="email" placeholder="Enter your email" required />
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Sending...' : 'GỬI' }}
      </button>
    </form>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { $http } from '@/plugins/http-wrapper'

export default {
  name: 'ResetPassword',
  data() {
    return {
      email: '',
      loading: false,
      successMessage: '',
      errorMessage: '',
    }
  },
  methods: {
    async submitForgotPassword() {
      this.successMessage = ''
      this.errorMessage = ''
      if (!this.email) {
        this.errorMessage = 'Email is required.'
        return
      }
      this.loading = true
      try {
        const response = await $http.post('/users/forgot-password', { email: this.email })
        this.successMessage = response || 'Password reset email sent successfully.'
      } catch (error) {
        this.errorMessage = error.message || 'Failed to send reset email.'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.forgot-password-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
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
  margin-bottom: 0.5rem;
  font-weight: 600;
}
input[type='email'] {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
.success-message {
  margin-top: 1rem;
  color: green;
  text-align: center;
}
.error-message {
  margin-top: 1rem;
  color: red;
  text-align: center;
}
</style>
