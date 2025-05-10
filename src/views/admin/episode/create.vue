<template>
  <div class="content-wrapper pb-5 pt-5">
    <div class="create-episode">
      <h2>Create New Episode</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="season">Season (optional)</label>
          <input
            type="number"
            id="season"
            v-model.number="season"
            min="1"
            placeholder="Season number"
          />
        </div>
        <div class="form-group">
          <label for="episodeNumber">Episode Number</label>
          <input type="number" id="episodeNumber" v-model.number="episodeNumber" required min="1" />
        </div>
        <div class="form-group">
          <label for="priceInTokens">Price in Tokens (optional)</label>
          <input
            type="number"
            id="priceInTokens"
            v-model.number="priceInTokens"
            min="0"
            placeholder="Price in tokens"
          />
        </div>
        <div class="form-group">
          <label for="duration">Duration (seconds)</label>
          <input
            type="number"
            id="duration"
            v-model.number="duration"
            required
            min="1"
            placeholder="Duration in seconds"
          />
        </div>
        <div class="form-group">
          <label for="movieId">Select Movie</label>
          <select id="movieId" v-model.number="movieId" required>
            <option value="" disabled>Select a movie</option>
            <option v-for="movie in movies" :key="movie.id" :value="movie.id">
              {{ movie.title }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="videoFile">Upload Video File (optional)</label>
          <input
            type="file"
            id="videoFile"
            @change="handleFileChange"
            accept="video/*"
            ref="videoFileInput"
          />
        </div>
        <button type="submit">Create Episode</button>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    </div>
  </div>
</template>

<script>
import { $http } from '../../../plugins/http-wrapper'
import { uploadEpisodeVideo } from '../../../services/episodeService'

export default {
  data() {
    return {
      season: null,
      episodeNumber: null,
      priceInTokens: null,
      duration: null,
      movieId: null,
      videoFile: null,
      errorMessage: '',
      successMessage: '',
      movies: [],
    }
  },
  methods: {
    async fetchMovies() {
      try {
        const res = await $http.get('/movies/index?page=0&size=100')
        if (res && res.content) {
          this.movies = res.content
        }
      } catch (error) {
        console.error('Failed to fetch movies:', error)
      }
    },
    handleFileChange(event) {
      const files = event.target.files
      if (files.length > 0) {
        this.videoFile = files[0]
      } else {
        this.videoFile = null
      }
    },
    async submitForm() {
      this.errorMessage = ''
      this.successMessage = ''
      if (!this.episodeNumber || !this.duration || !this.movieId) {
        this.errorMessage = 'Please fill in all required fields.'
        return
      }
      try {
        const episodeData = {
          season: this.season || null,
          episodeNumber: this.episodeNumber,
          priceInTokens: this.priceInTokens || null,
          duration: this.duration,
          videoUrl: '', // will be updated after upload if file provided
          movie: { id: this.movieId },
        }
        // Create episode
        const response = await $http.post('/episodes/add', episodeData)
        const createdEpisode = response

        // Upload video if file selected
        if (this.videoFile) {
          await uploadEpisodeVideo(createdEpisode.id, this.videoFile)
        }

        this.successMessage = 'Episode created successfully.'
        // Reset form
        window.location.href = '/admin/episode'
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message
        } else {
          this.errorMessage = 'Failed to create episode.'
        }
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

.create-episode {
  max-width: 400px;
  margin: 20px auto;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input[type='number'],
input[type='text'],
input[type='file'],
select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.error-message {
  margin-top: 15px;
  color: red;
}
.success-message {
  margin-top: 15px;
  color: green;
}
</style>
