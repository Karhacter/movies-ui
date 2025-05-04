<template>
  <div class="ps-5">
    <div class="categories-grid">
      <router-link
        v-for="category in limitedCategories"
        :key="category.id"
        :to="`/movies/category/${category.link}`"
        class="category-item"
        :class="categoryColorClass(category.id)"
      >
        {{ category.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { $http } from '@/plugins/http-wrapper'

export default {
  name: 'CategoriesDisplay',
  setup() {
    const categories = ref([])

    const fetchCategories = async () => {
      try {
        const res = await $http.get('/categories/index')
        categories.value = res
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    onMounted(() => {
      fetchCategories()
    })

    const limitedCategories = computed(() => categories.value.slice(0, 9))

    const categoryColorClass = (id) => {
      const colors = ['blue', 'yellow', 'red', 'green', 'purple', 'orange', 'pink', 'brown', 'gray']
      return colors[id % colors.length]
    }

    return {
      limitedCategories,
      categoryColorClass,
    }
  },
}
</script>

<style scoped>
.title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.categories-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.category-item {
  padding: 40px;
  border-radius: 8px;
  text-decoration: none;
  color: white;
  font-weight: 500;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  min-height: 80px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Color classes */
.blue {
  background-color: #007bff;
}

.yellow {
  background-color: #ffc107;
  color: black;
}

.red {
  background-color: #dc3545;
}

.green {
  background-color: #49dc35;
}
.purple {
  background-color: #7b35dc;
}

.orange {
  background-color: #dc8335;
}

.pink {
  background-color: #dc3596;
}

.brown {
  background-color: #2c3f50aa;
}

.gray {
  background-color: #383c3890;
}

.category-item:hover {
  filter: brightness(85%);
}
</style>
