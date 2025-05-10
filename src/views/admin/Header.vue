<template>
  <div class="hold-transition sidebar-mini layout-fixed">
    <nav class="main-header navbar navbar-expand navbar-dark navbar-black p-2">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#" role="button"
            ><i class="fas fa-bars"></i
          ></a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <router-link to="/admin" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <router-link to="/contact" class="nav-link">Contact</router-link>
        </li>
      </ul>
      <!-- Right nav -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item d-none d-sm-inline-block">
          <a href="#" class="nav-link" title="Notifications">
            <i class="fas fa-bell"></i>
            <span class="badge badge-warning navbar-badge" v-if="notificationCount > 0">{{
              notificationCount
            }}</span>
          </a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <a href="#" class="nav-link" @click.prevent="handleLogout">Logout</a>
        </li>
      </ul>
    </nav>

    <!-- header sidebar -->
    <SideBar />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SideBar from './SideBar.vue'
import { $http } from '@/plugins/http-wrapper'

const notificationCount = ref(5)

onMounted(() => {
  const treeviewItems = document.querySelectorAll('.nav-item.has-treeview > a')

  treeviewItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault()
      const parentLi = item.parentElement
      if (parentLi.classList.contains('menu-open')) {
        parentLi.classList.remove('menu-open')
      } else {
        parentLi.classList.add('menu-open')
      }
    })
  })
})

const handleLogout = async () => {
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

    if (response) {
      localStorage.removeItem('token')
      document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      window.location.href = '/login'
    }
  } catch (error) {
    console.error('Logout failed:', error)
    alert('Logout failed. Please try again.')
  }
}
</script>

<style scoped>
@import '@/assets/css/adminlte.css';

.navbar {
  background-color: white;
}

.badge.navbar-badge {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.75rem;
  background-color: #ffc107;
  color: #212529;
  border-radius: 50%;
  padding: 2px 5px;
}
</style>
