<template>
  <div>
    <keep-alive>
      <component :is="layout" />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',

  computed: {
    layout() {
      return this.$route.meta.layout + 'Layout'
    },
  },
}
</script>
