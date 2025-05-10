<template>
  <div class="content-wrapper pb-5" style="background-color: #ffffff">
    <section class="content-body pb-5" style="padding: 20px">
      <div class="edit-episode">
        <h2>Edit Episode</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="episodeNumber">Episode Number</label>
            <input
              type="number"
              id="episodeNumber"
              v-model.number="episodeNumber"
              required
              min="1"
            />
          </div>

          <div class="form-group">
            <label for="duration">Duration</label>
            <input
              type="text"
              id="duration"
              v-model="duration"
              placeholder="e.g. 45m, 1h 20m"
              required
            />
          </div>

          <div class="form-group">
            <label for="videoFile">Upload Video</label>
            <input type="file" id="videoFile" @change="handleFileChange" accept="video/*" />
          </div>

          <button type="submit">Update Episode</button>
        </form>

        <div v-if="message" :class="{ 'success-message': success, 'error-message': !success }">
          {{ message }}
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { updateEpisode, uploadEpisodeVideo, getEpisodeById } from '@/services/episodeService'

export default {
  name: 'EditEpisode',
  data() {
    return {
      epId: null,
      episodeNumber: null,
      duration: '',
      videoFile: null,
      message: '',
      success: false,
      episode: {},
    }
  },
  created() {
    this.epId = Number(this.$route.params.id)
    if (this.epId) {
      this.loadEpisode()
    }
  },
  methods: {
    async loadEpisode() {
      try {
        const response = await getEpisodeById(this.epId)
        this.episode = response
        this.episodeNumber = this.episode.episodeNumber
        this.duration = this.episode.duration
      } catch (error) {
        this.message = 'Failed to load episode data.'
        this.success = false
      }
    },
    handleFileChange(event) {
      const files = event.target.files
      if (files && files.length > 0) {
        this.videoFile = files[0]
      }
    },
    async submitForm() {
      if (!this.epId) {
        this.message = 'Invalid episode ID.'
        this.success = false
        return
      }
      if (this.episodeNumber === null || this.duration === '') {
        this.message = 'Please fill in all required fields.'
        this.success = false
        return
      }
      try {
        await updateEpisode(this.epId, {
          episodeNumber: this.episodeNumber,
          duration: this.duration,
        })
        if (this.videoFile) {
          await uploadEpisodeVideo(this.epId, this.videoFile)
        }

        this.message = 'Episode updated successfully.'
        this.success = true
        window.location.href = `/admin/episode/movie/${this.episode.movieId}`
      } catch (error) {
        this.message = 'Failed to update episode. Please try again.'
        this.success = false
      }
    },
  },
}
</script>

<style scoped>
@import '@/assets/css/adminlte.css';

.edit-episode {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.25rem;
}

input[type='number'],
input[type='text'],
input[type='file'] {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.success-message {
  color: green;
  margin-top: 1rem;
}

.error-message {
  color: red;
  margin-top: 1rem;
}
</style>
