<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark"
    :class="{ 'bg-dark': isScrolled }"
    id="header-nav"
  >
    <div class="container-fluid">
      <a class="navbar-brand text-danger fw-bold" href="home">MovieStream</a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse pt-2 pb-2" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <VNav />
        </ul>

        <form id="searchForm" class="d-flex me-3">
          <input
            class="form-control me-2"
            type="text"
            id="searchText"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-danger" type="submit">Search</button>
        </form>

        <!-- User Avatar/Login Button -->
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
                      ><i class="fa fa-person"></i>&nbsp;&nbsp;&nbsp; Thông tin tài
                      khoản</router-link
                    >
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="/watchlist"
                      ><i class="fa-solid fa-film"></i>&nbsp;&nbsp;&nbsp;Tủ Phim</router-link
                    >
                  </li>
                  <li>
                    <router-link class="dropdown-item" href="#"
                      ><i class="fa fa-history" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Lịch
                      Sử</router-link
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
      </div>
    </div>
  </nav>
</template>

<script>
import VNav from '@/components/Nav.vue'
import { $http } from '@/plugins/http-wrapper'

export default {
  components: {
    VNav,
  },

  data() {
    return {
      isScrolled: false,
      hasNotifications: false,
      userEmail: null,
      isLoggedIn: false,
      userAvatar: null,
    }
  },

  mounted() {
    this.checkAuthState()
    window.addEventListener('scroll', this.handleScroll)
    // Check auth state every 5 minutes
    this.authInterval = setInterval(this.checkAuthState, 300000)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    clearInterval(this.authInterval)
  },

  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    },
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
            this.userAvatar = `http://localhost:8080${userInfo.avatar}`
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
        // Get token from localStorage or cookie
        const token =
          localStorage.getItem('token') ||
          document.cookie
            .split('; ')
            .find((row) => row.startsWith('token='))
            ?.split('=')[1]

        // Make logout request with explicit token
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
          // Clear client-side token storage
          localStorage.removeItem('token')
          document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
          this.isLoggedIn = false
          this.userEmail = null
          // Full reload to clear all state
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

<style>
#header-nav .navbar-nav .nav-item .nav-link:hover {
  color: red;
  text-decoration: none;
  transition:
    color 0.3s ease,
    text-shadow 0.3s ease;
  text-shadow: 0 0 10px red;
}

/* Navbar fixed lauyout  */
.navbar {
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
  transition: background-color 0.3s ease;
  background-color: transparent !important;
}

.navbar.bg-dark {
  background-color: rgba(0, 0, 0, 0.95) !important;
}

/* User section styles */
.user-section {
  display: flex;
  align-items: center;
}

.user-btn {
  color: white;
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  border: 1px solid white;
  border-radius: 20px;
  background: none;
}

.user-btn:hover {
  border: 1px solid red;
  color: red;
  text-decoration: none;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
  transition: transform 0.2s ease;
}

.user-avatar:hover {
  transform: scale(1.05);
}

.dropdown-menu {
  background-color: rgba(33, 37, 41, 0.95);
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  color: white;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.dropdown-divider {
  border-color: rgba(255, 255, 255, 0.1);
}

@media (max-width: 992px) {
  .navbar {
    position: relative;
  }

  .user-section {
    margin-top: 10px;
  }
}

/* Notification styles */
.notification-bell {
  position: relative;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.notification-bell:hover {
  transform: scale(1.1);
}

.notification-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #e50914;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.7rem;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #000;
}
</style>
