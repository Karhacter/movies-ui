<template>
  <div class="content-wrapper pb-5" style="background-color: #ffffff">
    <section class="content-body pb-5" style="padding: 20px">
      <h1>Episode List</h1>
      <router-link to="/admin/episode/movie/create" class="btn btn-sm btn-success me-2 mb-2">
        <i class="fa fa-create"></i> Tạo Tập Phim Mới
      </router-link>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Movie Title</th>
            <th>Total Episode</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="episode in episodes" :key="episode.id">
            <td>{{ episode.id }}</td>
            <td>{{ movieTitles[episode.movieId.toString()] || 'Loading...' }}</td>
            <td>{{ episode.episodeNumber }}</td>
            <td>
              <button @click="goToMovieEpisodes(episode.movieId)">Show All</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination-controls">
        <button @click="prevPage" :disabled="page === 1">Previous</button>
        <span>Page {{ page }}</span>
        <button @click="nextPage" :disabled="!hasMore">Next</button>
      </div>
    </section>
  </div>
</template>

<script>
import { $http } from '@/plugins/http-wrapper'

export default {
  data() {
    return {
      episodes: [],
      movieTitles: {},
      page: 1,
      size: 10,
      hasMore: true,
    }
  },
  mounted() {
    this.fetchEpisodes()
  },
  methods: {
    async fetchEpisodes() {
      const response = await $http.get('/episodes/index', {
        page: this.page - 1,
        size: this.size,
      })
      this.episodes = response.content
      this.hasMore = !response.last

      // Fetch movie titles for each episode
      this.episodes.forEach((episode) => {
        if (!this.movieTitles[episode.movieId]) {
          this.fetchMovieTitle(episode.movieId)
        }
      })
    },
    async fetchMovieTitle(movieId) {
      try {
        const response = await $http.get(`/movie/detail/${movieId}`)
        const title = response.title || JSON.stringify(response)
        this.movieTitles[movieId.toString()] = title
      } catch (error) {}
    },
    nextPage() {
      if (this.hasMore) {
        this.page++
        this.fetchEpisodes()
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--
        this.fetchEpisodes()
      }
    },
    goToMovieEpisodes(movieId) {
      this.$router.push({ path: `/admin/episode/movie/${movieId}` })
    },
  },
}
</script>

<style scoped>
@import '@/assets/css/adminlte.css';
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.table th {
  background-color: #f2f2f2;
  text-align: left;
}

.pagination-controls {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
