<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Sign Up</h1>

      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="input-group">
          <input type="text" v-model="user.name" placeholder="Full Name" required />
        </div>

        <div class="input-group">
          <input type="email" v-model="user.email" placeholder="Email" required />
        </div>

        <div class="input-group">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="user.password"
            placeholder="Password"
            required
          />
          <i
            class="fa fa-eye"
            :class="{ 'fa-eye-slash': showPassword }"
            @click="showPassword = !showPassword"
          ></i>
        </div>

        <div class="input-group">
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            v-model="confirmPassword"
            placeholder="Confirm Password"
            required
          />
          <i
            class="fa fa-eye"
            :class="{ 'fa-eye-slash': showConfirmPassword }"
            @click="showConfirmPassword = !showConfirmPassword"
          ></i>
        </div>

        <button type="submit" class="signin-button">Sign Up</button>

        <div class="divider">
          <span>OR</span>
        </div>
        <SocialLoginButtons />

        <div class="signup-text">
          Already have an account? <router-link to="/login">Sign in now.</router-link>
        </div>

        <div class="captcha-text">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          <a href="#" class="learn-more">Learn more.</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { $http } from '@/plugins/http-wrapper'
import SocialLoginButtons from '@/components/Login/SocialLoginButtons.vue'

const router = useRouter()
const errors = reactive({})
const user = reactive({
  name: '',
  email: '',
  password: '',
})
const confirmPassword = ref('')

const showPassword = ref(false)
const showConfirmPassword = ref(false)

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
  if (!user.password) {
    errors.password = 'Password is required.'
    hasError = true
  }
  if (!confirmPassword.value) {
    errors.confirmPassword = 'Confirm Password is required.'
    hasError = true
  }
  if (user.password !== confirmPassword.value) {
    errors.confirmPassword = 'Passwords do not match.'
    hasError = true
  }
  if (hasError) return

  const userDTO = {
    name: user.name,
    email: user.email,
    password: user.password,
  }

  const formData = new FormData()
  const userBlob = new Blob([JSON.stringify(userDTO)], { type: 'application/json' })
  formData.append('userDTO', userBlob, '') // Append with empty filename

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
    // Check if error response indicates email already exists
    if (error.response && error.response.data && error.response.data.message) {
      const msg = error.response.data.message.toLowerCase()
      if (msg.includes('email') && msg.includes('exist')) {
        errors.email = 'Email already exists.'
        return
      }
    }
    errors.general = 'Failed to create user: ' + error.message
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%),
    url('https://static.vecteezy.com/system/resources/previews/043/555/242/non_2x/realistic-3d-cinema-film-strip-in-perspective-isolated-on-blue-background-template-cinema-festival-movie-design-cinema-film-strip-for-ad-poster-presentation-show-brochure-banner-or-flyer-vector.jpg')
      no-repeat center center fixed;
  background-size: cover;
  padding: 20px;
}

.login-box {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.75);
  border-radius: 4px;
}

h1 {
  color: white;
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 28px;
  text-align: center;
}

.input-group {
  position: relative;
  margin-bottom: 16px;
}

.input-group input {
  width: 100%;
  height: 50px;
  background: rgba(51, 51, 51, 0.8);
  border: none;
  border-radius: 4px;
  color: white;
  padding: 16px;
  font-size: 16px;
}

.input-group input:focus {
  background: #454545;
  outline: none;
}

.input-group input::placeholder {
  color: #8c8c8c;
}

.input-group i {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #8c8c8c;
  cursor: pointer;
}

.signin-button {
  width: 100%;
  height: 50px;
  background: #e50914;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 24px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.signin-button:hover {
  background: #f40612;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 16px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #333;
}

.divider span {
  padding: 0 10px;
  color: #737373;
  font-size: 14px;
}

.help-text {
  text-align: right;
  margin: 16px 0;
}

.help-text a {
  color: #737373;
  text-decoration: none;
  font-size: 14px;
}

.help-text a:hover {
  text-decoration: underline;
}

.signup-text {
  color: #737373;
  font-size: 16px;
  margin-top: 16px;
  text-align: center;
}

.signup-text a {
  color: white;
  text-decoration: none;
  margin-left: 4px;
}

.signup-text a:hover {
  text-decoration: underline;
}

.captcha-text {
  color: #737373;
  font-size: 13px;
  margin-top: 16px;
  text-align: center;
}

.captcha-text .learn-more {
  color: #0071eb;
  text-decoration: none;
}

.captcha-text .learn-more:hover {
  text-decoration: underline;
}

@media (max-width: 740px) {
  .login-box {
    padding: 20px;
  }
}
</style>
