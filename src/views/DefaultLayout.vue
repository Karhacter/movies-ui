<template>
  <v-app>
    <VHeader />
    <v-main>
      <RouterView />
    </v-main>
    <VFooter />
  </v-app>
</template>

<script>
import VHeader from '@/components/Header.vue'
import VFooter from '../components/Footer.vue'

export default {
  components: {
    VHeader,
    VFooter,
  },
}
</script>
