<template>
  <div class="dropdown-content" style="color: white">
    <div class="category-container">
      <div v-for="category in categories" :key="category.id" class="category-item">
        <router-link :to="`/movies/category/${category.link}`" class="category-link">
          {{ category.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { $http } from '@/plugins/http-wrapper'
export default {
  data: () => ({
    categories: [],
  }),
  mounted() {
    this.fetchCategory()
  },
  methods: {
    async fetchCategory() {
      try {
        const res = await $http.get('/categories/index')
        this.categories = res
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },
  },
}
</script>

<style scoped>
.category-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 8px; /* for scrollbar space */
}

.category-link {
  text-decoration: none;
  color: white;
  padding: 8px;
  display: block;
}
</style>
