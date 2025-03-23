<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Sign Up</h1>

      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="input-group">
          <input type="text" v-model="name" placeholder="Full Name" required />
        </div>

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

        <div class="help-text">
          <a href="#" class="help-link">Need help?</a>
        </div>

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

<script lang="ts">
import { useRouter } from 'vue-router'

export default {
  name: 'Signup',
  setup() {
    const router = useRouter()

    const handleSignup = async (name: string, email: string, password: string) => {
      try {
        // Replace this with your actual signup API call
        // const response = await yourAuthService.signup(name, email, password)

        // Store the token
        localStorage.setItem('token', 'UserToken')

        // Redirect to home page after successful signup
        router.push('/home')
      } catch (error) {
        console.error('Signup failed:', error)
        // Handle signup error (show message, etc.)
      }
    }

    return {
      handleSignup,
    }
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
    }
  },
  methods: {
    async handleSubmit() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match!')
        return
      }
      await this.handleSignup(this.name, this.email, this.password)
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
}
</style>
