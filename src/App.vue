<template>
  <v-app>
    <component :is="layout" />
  </v-app>
</template>

<script>
  import './assets/css/style.css'
  import './assets/css/bootstrap.min.css'
  import './assets/css/style-min.css'
  import './assets/css/cards.css'
  import './assets/css/faq.css'

const default_layout = 'default'

export default {
  name: 'App',
  components: {},

  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout'
    },
  },
}
</script>
