<template>
  <v-app>
    <VHeader />
    <v-main>
      <router-view />
    </v-main>
    <VFooter />
  </v-app>
</template>

<script>
import VHeader from '@/components/Header.vue'
import VFooter from '../components/Footer.vue'

export default {
  setup() {},
  components: {
    VHeader,
    VFooter,
  },
  data() {
    return {
      layout: 'Default',
    }
  },
}
</script>
