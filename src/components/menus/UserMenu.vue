<template>
  <div class="user-section ps-3">
    <template v-if="isLoggedIn">
      <div class="d-flex align-items-center">
        <!-- Notification Bell -->
        <div class="notification-bell me-3">
          <i class="fas fa-bell"></i>
          <span class="notification-badge" v-if="hasNotifications">3</span>
        </div>

        <!-- User Avatar Dropdown -->
        <div class="dropdown">
          <button
            class="btn btn-link user-btn"
            type="button"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              v-if="userAvatar"
              :src="userAvatar"
              alt="User Avatar"
              class="user-avatar"
              @error="userAvatar = null"
            />
            <i v-else class="fas fa-user-circle default-avatar"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li>
              <router-link class="dropdown-item" to="/account/info"
                ><i class="fa fa-person"></i>&nbsp;&nbsp;&nbsp; Thông tin tài khoản</router-link
              >
            </li>
            <li>
              <a class="dropdown-item" href="/tu-phim"
                ><i class="fa-solid fa-film"></i>&nbsp;&nbsp;&nbsp;Tủ Phim</a
              >
            </li>
            <li>
              <a class="dropdown-item" href="/lich-su-xem"
                ><i class="fa fa-history" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Lịch Sử</a
              >
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="/login" @click="handleLogout">Thoát</a></li>
          </ul>
        </div>
      </div>
    </template>
    <template v-else>
      <router-link to="/login" class="btn btn-link user-btn">
        <i class="fas fa-user-circle pr-2"></i>
        <span>Thành Viên</span>
      </router-link>
    </template>
  </div>
</template>

<script>
import { $http } from '@/plugins/http-wrapper'

export default {
  name: 'UserMenu',
  data() {
    return {
      hasNotifications: false,
      isLoggedIn: false,
      userAvatar: null,
    }
  },
  mounted() {
    this.checkAuthState()
    this.authInterval = setInterval(this.checkAuthState, 300000)
  },
  beforeUnmount() {
    clearInterval(this.authInterval)
  },
  methods: {
    async checkAuthState() {
      const token =
        localStorage.getItem('token') ||
        document.cookie
          .split('; ')
          .find((row) => row.startsWith('token='))
          ?.split('=')[1]

      const res = await $http.get('/auth/check')
      if (!res) {
        this.isLoggedIn = false
      }
      this.isLoggedIn = !!token
      if (this.isLoggedIn) {
        try {
          const userInfo = await $http.get('/auth/userinfo')
          if (userInfo && userInfo.avatar) {
            this.userAvatar = `${import.meta.env.VITE_API_URL}${userInfo.avatar}`
          } else {
            this.userAvatar = '/src/assets/avatar.png'
          }
        } catch (error) {
          this.userAvatar = '/src/assets/avatar.png'
        }
      }
    },
    async handleLogout(e) {
      e.preventDefault()
      try {
        const token =
          localStorage.getItem('token') ||
          document.cookie
            .split('; ')
            .find((row) => row.startsWith('token='))
            ?.split('=')[1]

        const response = await $http.post(
          '/auth/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (response.status === 200) {
          localStorage.removeItem('token')
          document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
          this.isLoggedIn = false
          this.userEmail = null
        }
        window.location.href = '/login'
      } catch (error) {
        console.error('Logout failed:', error)
        alert('Logout failed. Please try again.')
      }
    },
  },
}
</script>
