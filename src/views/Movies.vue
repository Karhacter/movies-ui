<template>
  <div class="container pt-5 mt-5">
    <div class="row justify-content-center">
      <!-- Section Right (80%) -->
      <div class="section-right col-md-9">
        <div class="d-flex justify-content-between align-items-center p-3">
          <h5 class="section-title" style="color: #ffc107; text-decoration: none">
            DANH SÁCH PHIM BỘ
          </h5>
          <div class="d-flex gap-2">
            <input
              v-model="searchQuery"
              type="text"
              class="form-control"
              placeholder="Search movies..."
              @input="searchMovies"
            />
            <select v-model="sortBy" class="form-select">
              <option value="rating">Sort by Rating</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
        </div>

        <div class="row ms-1" id="movies">
          <div
            class="col-md-3 col-sm-3 col-xs-6 grid-item mb-4 ps-0"
            v-for="movie in displayedMovies"
            :key="movie.id"
          >
            <MovieCard :movie="movie" />
          </div>
        </div>
      </div>

      <!-- Section Left (20%) -->
      <div class="section-left col-md-3 text-white p-3">
        <h4>Top Phim Bộ</h4>
        <div class="list-group" id="top-movies">
          <div
            class="list-group-item d-flex align-items-center mb-2"
            v-for="movie in topMovies"
            :key="movie.id"
          >
            <img
              :src="movie.image"
              alt="Movie Poster"
              class="img-fluid me-3"
              style="width: 50px; height: 75px; object-fit: cover"
            />
            <div>
              <h6 class="text-white mb-1">{{ movie.title }}</h6>
              <p class="text-warning mb-0">IMDb {{ movie.rating }} / 10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { $http } from '@/utils/http-wrapper'
import MovieCard from '@/components/MovieCard.vue'

interface Movie {
  id: number
  title: string
  image: string
  rating: number
}

const movies = ref<Movie[]>([])
const topMovies = ref<Movie[]>([])
const searchQuery = ref('')
const sortBy = ref('rating')
const loading = ref(false)
const error = ref<string | null>(null)

// Computed property for filtered and sorted movies
const displayedMovies = computed(() => {
  let filtered = [...movies.value]
  if (searchQuery.value) {
    filtered = filtered.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }
  return filtered.sort((a, b) =>
    sortBy.value === 'rating' ? b.rating - a.rating : a.title.localeCompare(b.title),
  )
})

// Fetch all movies
const fetchMovies = async () => {
  try {
    loading.value = true
    const moviesData = await $http.get<Movie[]>('/movies/index')
    if (moviesData && Array.isArray(moviesData)) {
      movies.value = moviesData
    }
  } catch (error: any) {
    console.error('Error fetching movies:', error)
  } finally {
    loading.value = false
  }
}

// Fetch top rated movies
const fetchTopMovies = async () => {
  try {
    const topMoviesData = await $http.get<Movie[]>('/movies/top')
    if (topMoviesData && Array.isArray(topMoviesData)) {
      topMovies.value = topMoviesData
    }
  } catch (error: any) {
    console.error('Error fetching top movies:', error)
  }
}

// Search movies (with debounce)
let searchTimeout: ReturnType<typeof setTimeout>
const searchMovies = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(fetchMovies, 300)
}

onMounted(() => {
  fetchMovies()
  fetchTopMovies()
})
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.section-right,
.section-left {
  background-color: #222;
  min-height: 100vh;
  padding: 20px;
  border-radius: 8px;
}

.section-left {
  background-color: #333;
}

.grid-item {
  padding: 10px;
}

.form-control,
.form-select {
  background-color: #333;
  border-color: #444;
  color: white;
}

.form-control:focus,
.form-select:focus {
  background-color: #333;
  border-color: #666;
  color: white;
}

.form-control::placeholder {
  color: #888;
}
</style>
