<template>
  <div class="content-wrapper" style="background-color: #ffffff">
    <section
      class="content-body"
      style="padding-bottom: 200px; padding-left: 20px; padding-right: 20px"
    >
      <h1 class="text-main text-success pt-5" style="margin-bottom: 30px">Comments Of Movie</h1>
      <div class="text-end mb-4">
        <router-link :to="{ name: 'CommentList' }" class="btn btn-sm btn-info">
          <i class="fa fa-search"></i> Tìm Kiếm Comment
        </router-link>
      </div>
      <div v-if="loading" class="text-center my-4">Loading movies...</div>
      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>
      <div v-if="!loading && !error" class="row g-3">
        <div v-for="movie in movies" :key="movie.id" class="col-md-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body d-flex flex-column justify-content-between">
              <p class="card-title text-center text-capitalize fs-4">{{ movie.title }}</p>
              <p class="card-text text-danger">Comments: {{ movie.commentsCount }}</p>
              <router-link
                :to="{ name: 'DetailComent', query: { movieTitle: movie.title } }"
                class="btn btn-primary mt-auto"
              >
                View All Comments
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination-controls" style="padding: 10px; text-align: center; margin-top: 20px">
        <button
          class="btn btn-sm btn-primary me-2"
          :disabled="currentPage === 0 || loading"
          @click="goToPage(currentPage - 1)"
        >
          Previous
        </button>
        <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
        <button
          class="btn btn-sm btn-primary ms-2"
          :disabled="currentPage === totalPages - 1 || loading"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { $http } from '@/plugins/http-wrapper'

export default {
  name: 'CommentIndex',
  data() {
    return {
      movies: [],
      loading: false,
      error: null,
      comments: [],
      commentsLoading: false,
      commentsError: null,
      selectedMovieTitle: null,
      currentPage: 0,
      pageSize: 10,
      totalPages: 0,
    }
  },
  methods: {
    async fetchMovies(page = 0) {
      if (this.loading) return
      this.loading = true
      this.error = null
      try {
        const queryParams = `?page=${page}&size=${this.pageSize}`
        const moviesData = await $http.get('/movies/index' + queryParams)
        // Fetch comment count for each movie
        const moviesWithCounts = await Promise.all(
          moviesData.content.map(async (movie) => {
            let count = 0
            const movieId = movie.id || movie.movieId || movie.movieID
            try {
              const countResponse = await $http.get(`comments/count/movie/${movieId}`)
              count = countResponse.count !== undefined ? countResponse.count : countResponse
            } catch (e) {
              console.error(`Failed to fetch comment count for movie ${movieId}:`, e)
            }
            return {
              title: movie.title,
              commentsCount: count,
              id: movieId,
            }
          })
        )
        this.movies = moviesWithCounts
        this.totalPages = moviesData.totalPages
        this.currentPage = page
      } catch (error) {
        console.error('Failed to fetch movies:', error)
        this.error = 'Failed to load movies data.'
      } finally {
        this.loading = false
      }
    },
    goToPage(page) {
      if (page >= 0 && page < this.totalPages) {
        this.fetchMovies(page)
      }
    },
  },
  mounted() {
    this.fetchMovies()
  },
}
</script>

<style scoped>
@import '@/assets/css/adminlte.css';
</style>
