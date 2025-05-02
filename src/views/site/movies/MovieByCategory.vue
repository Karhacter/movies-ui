<template>
  <div class="container">
    <h5 class="section-title" style="color: #ffc107; text-decoration: none">
      DANH SÁCH PHIM THỂ LOẠI {{ this.route.params.link }}
    </h5>

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

<script>
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MovieCard from '@/components/movies/MovieCard.vue'
import MoviePagination from '@/components/movies/MoviePagination.vue'
import MovieSidebar from '@/components/movies/MovieSidebar.vue'
import MovieSearch from '@/components/movies/MovieSearch.vue'
import { $http } from '@/plugins/http-wrapper'

export default defineComponent({
  name: 'MoviesView',
  components: {
    MovieCard,
    MoviePagination,
    MovieSidebar,
    MovieSearch,
  },
  data() {
    return {
      movies: [],
      topMovies: [],
      loading: false,
      currentPage: 0,
      totalPages: 0,
      pageSize: 10,
      sortBy: 'rating',
      sortOrder: 'desc',
      searchQuery: '',
      pageCache: new Map(),
      pageChangeTimeout: null,
    }
  },

  setup() {
    const route = useRoute()
    const router = useRouter()
    return { route, router }
  },
  methods: {
    async fetchMovies() {
      if (this.loading) return
      try {
        this.loading = true
        console.log('Route params:', this.route.params)
        console.log('Current page:', this.currentPage)

        if (this.pageCache.has(this.currentPage)) {
          this.movies = this.pageCache.get(this.currentPage)
          this.loading = false
          return
        }

        const response = await $http.get(`/movies/category/link/${this.route.params.link}`, {
          params: new URLSearchParams({
            page: this.currentPage,
            size: this.pageSize,
            sortBy: this.sortBy,
            sortOrder: this.sortOrder,
            search: this.searchQuery,
          }),
        })

        if (response && response.content) {
          console.log('API Response:', response)
          this.movies = response.content
          this.totalPages = response.totalPages
          this.pageCache.set(this.currentPage, response.content)
        } else {
          console.warn('Empty or invalid API response')
        }
      } catch (error) {
        console.error('Failed to fetch movies:', error)
      } finally {
        this.loading = false
      }
    },
    changePage(page) {
      if (this.loading || page < 0 || page >= this.totalPages) return

      if (this.pageChangeTimeout) {
        clearTimeout(this.pageChangeTimeout)
      }
      this.pageChangeTimeout = setTimeout(() => {
        this.currentPage = page
        this.router.push({
          query: {
            ...this.route.query,
            page: page + 1,
          },
        })
        this.fetchMovies()
      }, 300)
    },
    handleSearch(query) {
      this.searchQuery = query
      this.resetAndFetch()
    },
    handleSort(sort) {
      this.sortBy = sort
      this.resetAndFetch()
    },
    resetAndFetch() {
      this.pageCache.clear()
      this.currentPage = 0
      this.router.push({
        query: {
          ...this.route.query,
          page: 1,
        },
      })
      this.fetchMovies()
    },
  },
  watch: {
    '$route.query.page': {
      handler(newPage) {
        if (newPage) {
          this.currentPage = Number(newPage) - 1
          this.fetchMovies()
        }
      },
    },
    '$route.params.link': {
      handler(newLink, oldLink) {
        if (newLink !== oldLink) {
          this.pageCache.clear()
          this.currentPage = 0
          this.fetchMovies()
        }
      },
      immediate: false,
    },
  },
  mounted() {
    const pageParam = this.route.query.page
    if (pageParam) {
      this.currentPage = Number(pageParam) - 1
    }
    this.fetchMovies()
  },
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
