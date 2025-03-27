<template>
  <div class="container pt-5 mt-5">
    <div class="row justify-content-center">
      <!-- Section Right (80%) -->
      <div class="section-right col-md-9">
        <!-- Add loading indicator -->
        <div v-if="loading" class="text-center text-white">Loading...</div>

        <div v-else>
          <MovieSearch @search="handleSearch" @sort="handleSort" />

          <div class="row ms-1" id="movies">
            <div
              class="col-md-3 col-sm-3 col-xs-6 grid-item mb-4 ps-0"
              v-for="movie in movies"
              :key="movie.id"
            >
              <MovieCard :movie="movie" />
            </div>
          </div>

          <MoviePagination
            :current-page="currentPage"
            :total-pages="totalPages"
            :loading="loading"
            @change-page="changePage"
          />
        </div>
      </div>

      <!-- Section Left (20%) -->
      <MovieSidebar :top-movies="topMovies" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { $http } from '@/plugins/http-wrapper'
import MovieCard from '@/components/movies/MovieCard.vue'
import MoviePagination from '@/components/movies/MoviePagination.vue'
import MovieSidebar from '@/components/movies/MovieSidebar.vue'
import MovieSearch from '@/components/movies/MovieSearch.vue'
import { useRoute, useRouter } from 'vue-router'

interface Movie {
  id: number
  title: string
  image: string
  rating: number
}

interface MovieResponse {
  content: Movie[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}

const route = useRoute()
const router = useRouter()
const movies = ref<Movie[]>([])
const topMovies = ref<Movie[]>([])
const loading = ref(false)
const currentPage = ref(0)
const totalPages = ref(0)
const pageSize = ref(10)
const sortBy = ref('rating')
const sortOrder = ref('desc')
const searchQuery = ref('')

// Cache for storing movie pages
const pageCache = new Map<number, Movie[]>()
let pageChangeTimeout: ReturnType<typeof setTimeout>

// Fetch all movies with caching
const fetchMovies = async () => {
  if (loading.value) return

  try {
    loading.value = true

    // Check cache first
    if (pageCache.has(currentPage.value)) {
      movies.value = pageCache.get(currentPage.value)!
      loading.value = false
      return
    }

    const params = {
      page: Number(currentPage.value),
      size: Number(pageSize.value),
      sortBy: sortBy.value,
      sortOrder: sortOrder.value,
      search: searchQuery.value,
    }

    const response = await $http.get<MovieResponse>('/movies/index', params)

    if (response && response.content) {
      movies.value = response.content
      totalPages.value = response.totalPages
      pageCache.set(currentPage.value, response.content)
    }
  } catch (error: any) {
    console.error('Failed to fetch movies:', error)
  } finally {
    loading.value = false
  }
}

// Debounced page change with URL update
const changePage = (page: number) => {
  if (loading.value || page < 0 || page >= totalPages.value) return

  clearTimeout(pageChangeTimeout)
  pageChangeTimeout = setTimeout(() => {
    currentPage.value = page
    router.push({
      query: {
        ...route.query,
        page: page + 1,
      },
    })
    fetchMovies()
  }, 300)
}

// Handle search and sort changes
const handleSearch = (query: string) => {
  searchQuery.value = query
  resetAndFetch()
}

const handleSort = (sort: string) => {
  sortBy.value = sort
  resetAndFetch()
}

const resetAndFetch = () => {
  pageCache.clear()
  currentPage.value = 0
  router.push({
    query: {
      ...route.query,
      page: 1,
    },
  })
  fetchMovies()
}

// Watch for URL changes
watch(
  () => route.query.page,
  (newPage) => {
    if (newPage) {
      currentPage.value = Number(newPage) - 1
      fetchMovies()
    }
  },
)

// Initial load
onMounted(() => {
  const pageParam = route.query.page
  if (pageParam) {
    currentPage.value = Number(pageParam) - 1
  }
  fetchMovies()
})
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.section-right {
  background-color: #222;
  min-height: 100vh;
  padding: 20px;
  border-radius: 8px;
}

.grid-item {
  padding: 10px;
}
</style>
