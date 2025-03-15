<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-dark" id="header-nav">
    <div class="container-fluid">
      <a class="navbar-brand" href="home.html">
        <!-- <img class="logo" src="Images/TheaterLogoFinal.png" alt="" width="30" height="24" -->
        /></a
      >
      <button
        id="nav"
        class="navbar-toggler"
        style="background-color: #8b0000"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" style="background-color: dark-grey"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <v-nav />
        </ul>

        <form id="searchForm" class="d-flex">
          <input
            class="form-control me-2"
            type="text"
            id="searchText"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-danger" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import VNav from './Nav.vue'

export default {
  components: {
    VNav,
  },
}
</script>
