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

export default {
  data() {
    return {
      menus: [],
    }
  },
  components: {
    Vcate,
  },
  mounted() {
    fetch('http://localhost:8080/api/menus/index')
      .then((response) => response.json())
      .then((data) => {
        this.menus = data
      })
  },
}
</script>

<style>
/* Custom styles if needed */
</style>
