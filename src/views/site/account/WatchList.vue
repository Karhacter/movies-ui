<template>
  <div class="container">
    <h3 class="section-title ms-5 ps-5" style="color: #ffc107; text-decoration: none">
      Tủ Phim Đang Theo Dõi
    </h3>
    <div class="row justify-content-center">
      <!-- Section Right (80%) -->
      <div class="section-right col-md-9">
        <!-- Add loading indicator -->
        <div v-if="loading" class="text-center text-white">Loading...</div>

        <div v-else>
          <MovieSearch @search="handleSearch" @sort="handleSort" />

          <div class="row ms-1" id="movies">
            <div
              class="col-md-3 col-sm-3 col-xs-6 grid-item mb-4 ps-0 position-relative"
              v-for="movie in watchlistMovies"
              :key="movie.id"
            >
              <button
                class="btn btn-danger btn-sm position-absolute top-0 end-0 me-4 mt-3"
                @click="removeFromWatchlist(movie.id)"
                title="Remove from Watchlist"
                style="z-index: 9999"
              >
                &times;
              </button>
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
      watchlist: [],
      userID: null,
      movies: [],
      loading: false,
      currentPage: 0,
      totalPages: 0,
      pageSize: 10,
      sortBy: 'rating',
      sortOrder: 'desc',
      searchQuery: '',
      pageCache: new Map(),
      pageChangeTimeout: null,
      watchlistMovies: [],
    }
  },

  setup() {
    const route = useRoute()
    const router = useRouter()
    return { route, router }
  },
  async created() {
    await this.fetchUserInfor()
    this.fetchWatchlist()
  },
  methods: {
    async fetchUserInfor() {
      try {
        const res = await $http.get('/auth/userinfo')
        if (res) {
          this.userID = res.userID
          return res.userID
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
      return null
    },

    async fetchWatchlist() {
      try {
        const resWatchList = await $http.get(`/watchlists/index/${this.userID}`)
        this.watchlist = resWatchList
        console.log(resWatchList)
        const movieIds = this.watchlist
          .map((item) => {
            if (item.resWatchList && item.resWatchList.movieId) {
              return item.resWatchList.movieId
            } else if (item.movieId) {
              return item.movieId
            } else if (item.id) {
              return item.id
            }
            return null
          })
          .filter((id) => id !== null)
        if (movieIds.length > 0) {
          const movieDetails = []
          for (const id of movieIds) {
            try {
              const response = await $http.get(`/movie/detail/${id}`)
              if (response) {
                movieDetails.push(response)
              }
            } catch (error) {
              console.error(`Failed to fetch movie detail for id ${id}:`, error)
            }
          }
          this.watchlistMovies = movieDetails
        }
      } catch (e) {
        console.error('Failed to fetch watchlist:', e)
      }
    },

    async removeFromWatchlist(movieId) {
      try {
        await $http.delete('/watchlists/remove', {
          userId: this.userID,
          movieId: movieId,
        })
        this.watchlist = this.watchlist.filter((item) => {
          const id = item.resWatchList ? item.resWatchList.movieId : item.movieId || item.id
          return id !== movieId
        })
        this.watchlistMovies = this.watchlistMovies.filter((movie) => movie.id !== movieId)
      } catch (error) {
        console.error('Failed to remove movie from watchlist:', error)
      }
    },

    async fetchMovies() {
      if (this.loading) return
      try {
        this.loading = true

        if (this.pageCache.has(this.currentPage)) {
          this.movies = this.pageCache.get(this.currentPage)
          this.loading = false
          return
        }

        const params = {
          page: Number(this.currentPage),
          size: Number(this.pageSize),
          sortBy: this.sortBy,
          sortOrder: this.sortOrder,
          search: this.searchQuery,
        }

        const response = await $http.get('/movies/index', params)

        if (response && response.content) {
          this.movies = response.content
          this.totalPages = response.totalPages
          this.pageCache.set(this.currentPage, response.content)
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
      }, 200)
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
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px;
}
</style>
