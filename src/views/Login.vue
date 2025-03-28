<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Sign In</h1>

      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="input-group">
          <input type="email" v-model="email" placeholder="Email" required />
        </div>

        <div class="input-group">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="Password"
            required
          />
          <i
            class="fa fa-eye"
            :class="{ 'fa-eye-slash': showPassword }"
            @click="showPassword = !showPassword"
          ></i>
        </div>

        <button type="submit" class="signin-button">Sign In</button>

        <div class="divider">
          <span>OR</span>
        </div>

        <div class="help-text">
          <a href="#" class="help-link">Need help?</a>
        </div>

        <div class="signup-text">
          New to Apna Theatre? <router-link to="/signup">Sign up now.</router-link>
        </div>

        <div class="captcha-text">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          <a href="#" class="learn-more">Learn more.</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()

    const handleLogin = async (email: string, password: string) => {
      try {
        // Replace this with your actual login API call
        // const response = await yourAuthService.login(email, password)

        // Store the token
        localStorage.setItem('token', 'your-auth-token')

        // Get redirect path or default to home
        const redirectPath = localStorage.getItem('redirectPath') || '/home'
        localStorage.removeItem('redirectPath')

        // Redirect to the intended page
        router.push(redirectPath)
      } catch (error) {
        console.error('Login failed:', error)
        // Handle login error (show message, etc.)
      }
    }

    return {
      handleLogin,
    }
  },
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
    }
  },
  methods: {
    async handleSubmit() {
      await this.handleLogin(this.email, this.password)
    },
  },
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

  h1 {
    font-size: 28px;
  }
}
</style>
