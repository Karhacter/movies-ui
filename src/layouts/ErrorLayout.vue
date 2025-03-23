<template>
  <div class="error-layout">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ErrorLayout',
}
</script>

<style scoped>
.error-layout {
  min-height: 100vh;
  width: 100%;
}
</style>
