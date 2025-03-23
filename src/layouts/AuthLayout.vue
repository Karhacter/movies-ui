<template>
  <div class="auth-layout">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AuthLayout',
}
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  background:
    linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%),
    url('https://static.vecteezy.com/system/resources/previews/043/555/242/non_2x/realistic-3d-cinema-film-strip-in-perspective-isolated-on-blue-background-template-cinema-festival-movie-design-cinema-film-strip-for-ad-poster-presentation-show-brochure-banner-or-flyer-vector.jpg')
      no-repeat center center fixed;
  background-size: cover;
}
</style>
