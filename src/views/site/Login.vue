<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Đăng Nhập</h1>

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

        <button type="submit" class="signin-button">Đăng Nhập</button>

        <div class="divider">
          <span>OR</span>
        </div>

        <SocialLoginButtons />
        <div class="signup-text">
          New to My Website? <router-link to="/signup">Đăng Ký.</router-link>
        </div>
        <div class="signup-text">
          Forgot Password? <router-link to="/reset-password">Quên Mật Khẩu</router-link>
        </div>
        <div class="captcha-text">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          <a href="#" class="learn-more">Learn more.</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { $http } from '@/plugins/http-wrapper'
import SocialLoginButtons from '@/components/Login/SocialLoginButtons.vue'
export default {
  name: 'Login',
  components: {
    SocialLoginButtons,
  },
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
    }
  },
  async created() {
    this.router = useRouter()
    try {
      const response = await $http.get('/auth/check', {
        withCredentials: true,
      })
      if (response.loggedIn) {
        this.router.push('/') // Redirect to home if already logged in
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await $http.post(
          '/auth/login',
          {
            email: this.email,
            password: this.password,
          },
          {
            withCredentials: true,
          }
        )

        // Verify auth status
        const authCheck = await $http.get('/auth/check', {
          withCredentials: true,
        })

        if (authCheck.loggedIn) {
          location.reload()
          this.router.push('/')
        } else {
          throw new Error('Login verification failed')
        }
      } catch (error) {
        console.error('Login failed:', error)
        alert('Login failed. Please check your credentials and try again.')
      }
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

.social-login-buttons {
  display: flex;
  gap: 8px;
  margin: 0;
}

.social-button {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  color: white;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.social-button.facebook {
  background-color: #3b5998;
}

.social-button.facebook:hover {
  background-color: #2d4373;
}

.social-button.google {
  background-color: #db4437;
}

.social-button.google:hover {
  background-color: #a33224;
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
