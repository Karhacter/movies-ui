<template>
  <div>
    <!-- Header -->
    <VHeader />

    <!-- Main Content -->
    <main>
      <router-view />
    </main>

    <!-- Footer -->
    <VFooter />
  </div>
</template>

<script>
import VHeader from '@/views/Header.vue'
import VFooter from '@/views/Footer.vue'

export default {
  components: {
    VHeader,
    VFooter,
  },
}
</script>
