<template>
  <div class="dropdown-content" style="color: white">
    <div v-for="category in categories" :key="category.id">
      <router-link :to="'/' + category.link" class="category-link">
        {{ category.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    categories: [],
  }),

  mounted() {
    fetch('http://localhost:9000/api/categories/index')
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data) // Debug API response
        this.categories = data // Correctly assign data
      })
      .catch((error) => console.error('Error fetching categories:', error))
  },
}
</script>

<style scoped>
.category-link {
  text-decoration: none;
  color: white;
  padding: 8px;
  display: block;
}
</style>
