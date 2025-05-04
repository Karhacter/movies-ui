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

        <SearchBar />

        <UserMenu />
      </div>
    </div>
  </nav>
</template>

<script>
import VNav from '@/components/Nav.vue'
import SearchBar from '@/components/menus/SearchBar.vue'
import UserMenu from '@/components/menus/UserMenu.vue'

export default {
  components: {
    VNav,
    SearchBar,
    UserMenu,
  },

  data() {
    return {
      isScrolled: false,
    }
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
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
