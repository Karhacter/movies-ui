<template>
  <div class="content-wrapper pb-5" style="background-color: #ffffff">
    <section class="content-body pb-5" style="padding: 20px">
      <div>
        <h1>Episode Detail</h1>
      </div>

      <table class="table table-bordered table-hover w-full text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th>ID</th>
            <th>Movie Title</th>
            <th>Episode</th>
            <th>Duration (min)</th>
            <th>Video URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="episode in episodes" :key="episode.id">
            <td>{{ episode.id }}</td>
            <td>{{ movieTitles[episode.movieId.toString()] || 'Loading...' }}</td>
            <td>{{ episode.episodeNumber }}</td>
            <td>{{ episode.duration }}</td>
            <td>{{ episode.videoUrl }}</td>
            <td>
              <div class="function_style">
                <router-link
                  :to="`/admin/episode/movie/edit/${episode.id}`"
                  class="btn btn-sm btn-primary me-2"
                >
                  <i class="fa fa-edit"></i> chỉnh sửa
                </router-link>
                <button class="btn btn-sm btn-danger me-2" @click="deleteMovie(episode.id)">
                  <i class="fa fa-trash"></i> xóa
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
    }
  },
  mounted() {
    this.fetchEpisodes()
  },
  methods: {
    async fetchEpisodes() {
      let movieId = this.$route.params.id
      const response = await $http.get(`/episodes/movie/${movieId}`)
      this.episodes = response
      // Fetch movie titles for each episode
      this.episodes.forEach((episode) => {
        if (!this.movieTitles[episode.movieId]) {
          this.fetchMovieTitle(episode.movieId)
        }
      })
    },
    async deleteEpisode(id) {
      try {
        const response = await $http.delete(`/episodes/delete/${id}`)
        if (response) {
          this.fetchEpisodes()
        }
      } catch (error) {
        console.error('Failed to soft delete movie:', error)
      }
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

.function_style {
  margin: auto;
  padding: 20px;
}
</style>
