<template>
  <div class="container">
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    ></button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item" v-for="(menu, index) in menus" :key="index">
          <a
            class="nav-link"
           :href="'http://localhost:5173/' + menu.link"
            v-if="menu.position == 'headermenu'"
          >
            {{ menu.name }}
          </a>
        </li>
      </ul>
    </div>

    <div class="d-flex align-items-center">
      <div class="dropdown">
        <button
          class="btn btn-outline-danger dropdown-toggle ms-2"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style="font-size: 20px"
        >
          Thể Loại
        </button>
        <Vcate />
      </div>
    </div>
  </div>
</template>

<script>
import Vcate from '@/components/Category.vue'
import { $http } from '@/plugins/http-wrapper';

export default {
  data() {
    return {
      menus: [],
      // baseUrl: import.meta.env.VITE_APP_URL,
    }
  },
  components: {
    Vcate,
  },
  mounted() {
    this.fetchMenu();
  },
  methods: {
    async fetchMenu() {
      try {
        const res = await $http.get('/menus/index')
        this.menus = res
      } catch (error) {
        console.error('Error fetching Menus:', error)
      }
    },
  },
}
</script>

<style>
/* Custom styles if needed */
</style>
