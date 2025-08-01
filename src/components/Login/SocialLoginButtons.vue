<template>
  <div class="social-login-buttons">
    <button
      class="social-button facebook"
      :disabled="loading || !oauth2Urls.facebook"
      @click="redirectTo(oauth2Urls.facebook)"
      title="Login with Facebook"
    >
      <i class="fab fa-facebook-f"></i>
      <span class="button-label"> Facebook</span>
    </button>
    <button
      class="social-button google"
      :disabled="loading || !oauth2Urls.google"
      @click="redirectTo(oauth2Urls.google)"
      title="Login with Google"
    >
      <i class="fab fa-google"></i>
      <span class="button-label"> Google</span>
    </button>
    <div v-if="loading" class="loading-text">Loading...</div>
    <div v-if="error" class="error-text">{{ error }}</div>
  </div>
</template>

<script>
import { $http } from '@/plugins/http-wrapper'
import { ref, onMounted } from 'vue'

export default {
  name: 'SocialLoginButtons',
  setup() {
    const loading = ref(false)
    const error = ref(null)
    const oauth2Urls = ref({ google: null, facebook: null })

    async function fetchOAuth2Urls() {
      loading.value = true
      error.value = null
      try {
        const data = await $http.get('/oauth/login')
        const backendBaseUrl = `${import.meta.env.VITE_API_URL}`
        // Prepend backend base URL if the URL is relative
        if (data.google && !data.google.startsWith('http')) {
          data.google = backendBaseUrl + data.google
        }
        if (data.facebook && !data.facebook.startsWith('http')) {
          data.facebook = backendBaseUrl + data.facebook
        }
        oauth2Urls.value = data
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    function redirectTo(url) {
      window.location.href = url
    }

    onMounted(() => {
      fetchOAuth2Urls()
    })

    return {
      loading,
      error,
      oauth2Urls,
      redirectTo,
    }
  },
}
</script>

<style scoped>
.social-login-buttons {
  display: flex;
  gap: 8px;
  margin: 0;
  align-items: center;
}

.social-button {
  width: 100px;
  height: 36px;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: background-color 0.2s ease;
  margin-bottom: 8px;
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

.button-label {
  user-select: none;
}

.loading-text {
  color: white;
  font-size: 14px;
}

.error-text {
  color: #ff6b6b;
  font-size: 14px;
}
</style>
