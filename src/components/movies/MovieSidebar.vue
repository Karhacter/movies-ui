<template>
  <div class="section-left col-md-3 text-white p-3">
    <div class="randomMovie pb-2">
      <span style="font-size: 15px; font-weight: bold; color: #ffc107">
        Chán Quá? <br />
        Không biết xem gì ?
        <p>Sao không thử túi mù ?</p>
      </span>
      <button class="btn btn-warning" style="margin: 0 0 15px 55px" @click="openBlindBag">
        <i class="fa-solid fa-caret-right"></i> &nbsp; Mở Túi Mù
      </button>
    </div>

    <div class="TopMovie">
      <h4>Top Phim Bộ</h4>
      <div class="list-group" id="top-movies">
        <router-link
          v-for="movie in topMovies"
          :key="movie.id"
          :to="`/movie/${movie.slug}`"
          class="list-group-item d-flex align-items-center mb-2 text-decoration-none"
        >
          <img
            :src="getMovieImage(movie.image)"
            alt="Movie Poster"
            class="img-fluid me-3"
            style="width: 50px; height: 75px; object-fit: cover"
          />
          <div>
            <h6 class="text-white mb-1">{{ movie.title }}</h6>
            <p class="text-warning mb-0">IMDb {{ movie.rating }} / 10</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { $http } from '@/plugins/http-wrapper'

export default {
  data() {
    return {
      topMovies: [],
    }
  },
  mounted() {
    this.fetchMovies()
  },

  methods: {
    getMovieImage(imageName) {
        return `${process.env.VITE_API_URL}${imageName}`
    },
    async fetchMovies() {
      try {
        const response = await $http.get('/movies/stats/top-rated', {
          limit: 10,
        })
        this.topMovies = response
      } catch (error) {
        console.error('Failed to fetch movies:', error)
      }
    },
    async openBlindBag() {
      try {
        const res = await $http.get('/movie/random')
        if (res) {
          this.$router.push(`/movie/${res.slug}`)
        }
      } catch (error) {
        console.error('Failed to fetch movies:', error)
      }
    },
  },
}
</script>

<style scoped>
.section-left {
  background-color: #333;
}

.randomMovie {
  background-color: black;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
}
</style>
