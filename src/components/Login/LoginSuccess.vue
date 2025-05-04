<template>
  <div class="login-success-container">
    <div>
      <h2>Login Successful</h2>
      <h4>Vui Lòng đợi trong {{ countdown }} Giây</h4>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { $http } from '@/plugins/http-wrapper'

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/'
}

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const username = ref('')
    const roles = ref([])
    const error = ref(null)
    const countdown = ref(5)
    let countdownInterval = null

    onMounted(async () => {
      const token = route.query.token
      if (token) {
        setCookie('token', token, 7)
        $http.setAccessToken(token)
        router.replace({ path: route.path, query: {} })
      } else {
        error.value = 'Missing token in URL'
        return
      }

      try {
        const data = await $http.get('/auth/check', { withCredentials: true })
        if (data.error) {
          error.value = data.error
          username.value = ''
          roles.value = []
        } else {
          username.value = data.username || ''
          roles.value = data.roles || []
          error.value = null

          // Start countdown timer
          countdownInterval = setInterval(() => {
            if (countdown.value > 0) {
              countdown.value--
            } else {
              clearInterval(countdownInterval)
              window.location.href = '/home'
            }
          }, 2000)
        }
      } catch (err) {
        error.value = err.message
        username.value = ''
        roles.value = []
      }
    })

    return {
      username,
      roles,
      error,
      countdown,
    }
  },
}
</script>

<style scoped>
h2 {
  color: green;
}
.error-text {
  color: #ff6b6b;
}
.login-success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background:
    linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%),
    url('https://static.vecteezy.com/system/resources/previews/043/555/242/non_2x/realistic-3d-cinema-film-strip-in-perspective-isolated-on-blue-background-template-cinema-festival-movie-design-cinema-film-strip-for-ad-poster-presentation-show-brochure-banner-or-flyer-vector.jpg')
      no-repeat center center fixed;
}
</style>
