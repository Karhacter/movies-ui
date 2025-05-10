<template>
  <div>
    <VHeader />
    <main>
      <router-view></router-view>
    </main>
    <VFooter />
  </div>
</template>

<script>
import VHeader from '@/views/site/Header.vue'
import VFooter from '@/views/site/Footer.vue'

export default {
  components: {
    VHeader,
    VFooter,
  },
}
</script>
