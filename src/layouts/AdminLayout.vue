<template>
  <div class="admin-layout">
    <AdminHeader />
    <main>
      <router-view></router-view>
    </main>
    <AdminFooter />
  </div>
</template>

<script>
import AdminHeader from '../views/admin/Header.vue'
import AdminFooter from '../views/admin/Footer.vue'

export default {
  components: {
    AdminHeader,
    AdminFooter,
  },
}
</script>

<style scoped></style>
