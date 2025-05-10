<template>
  <div class="container">
    <h3 class="section-title pb-5 ms-5 ps-5" style="color: #ffc107; text-decoration: none">
      Lịch Sử Xem
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
              v-for="historyItem in historyItems"
              :key="historyItem.historyId"
            >
              <button
                class="btn btn-danger btn-sm position-absolute top-0 end-0 me-4 mt-3"
                @click="removeFromHistory(historyItem.historyId)"
                title="Remove from history"
                style="z-index: 9999"
              >
                &times;
              </button>
              <MovieCard :movie="historyItem.movie" />
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
import { $http } from '@/plugins/http-wrapper'

export default defineComponent({
  name: 'MoviesView',
  components: {
    MovieCard,
    MoviePagination,
    MovieSidebar,
  },
  data() {
    return {
      userID: null,
      historyItems: [],
      loading: false,
      currentPage: 0,
      totalPages: 0,
      pageSize: 10,
      pageCache: new Map(),
      pageChangeTimeout: null,
    }
  },

  setup() {
    const route = useRoute()
    const router = useRouter()
    return { route, router }
  },
  async created() {
    await this.fetchUserInfor()
    this.fetchHistory()
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

    async fetchHistory() {
      if (this.loading) return
      try {
        this.loading = true

        if (this.pageCache.has(this.currentPage)) {
          this.historyItems = this.pageCache.get(this.currentPage)
          this.loading = false
          return
        }

        const response = await $http.get(`/history/view/${this.userID}`, {
          page: this.currentPage,
          size: this.pageSize,
        })

        if (response && response.content) {
          const historyItems = response.content
          this.totalPages = response.totalPages
          this.pageCache.set(this.currentPage, historyItems)
          // Fetch movie details for each history item and merge with history id
          const mergedItems = []
          for (const item of historyItems) {
            try {
              const movieResponse = await $http.get(`/movie/detail/${item.movieId}`)
              if (movieResponse) {
                mergedItems.push({
                  historyId: item.id,
                  movie: movieResponse,
                })
              }
            } catch (error) {
              console.error(`Failed to fetch movie detail for id ${item.movieId}:`, error)
            }
          }
          this.historyItems = mergedItems
        }
      } catch (error) {
        console.error('Failed to fetch history:', error)
      } finally {
        this.loading = false
      }
    },

    async removeFromHistory(id) {
      try {
        await $http.delete(`/history/${id}`)
        this.historyItems = this.historyItems.filter((item) => item.id !== id)
      } catch (error) {
        console.error('Failed to remove history item:', error)
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
        this.fetchHistory()
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
      this.fetchHistory()
    },
  },
  watch: {
    '$route.query.page': {
      handler(newPage) {
        if (newPage) {
          this.currentPage = Number(newPage) - 1
          this.fetchHistory()
        }
      },
    },
  },
  mounted() {
    const pageParam = this.route.query.page
    if (pageParam) {
      this.currentPage = Number(pageParam) - 1
    }
    this.fetchHistory()
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
