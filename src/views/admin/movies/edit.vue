<template>
  <div class="content-wrapper p-5">
    <h2 class="text-warning">Edit Movie</h2>
    <form @submit.prevent="handleSubmit" novalidate>
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" id="title" v-model="movie.title" class="form-control" required />
        <div v-if="errors.title" class="text-danger mt-1">{{ errors.title }}</div>
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          id="description"
          v-model="movie.description"
          class="form-control"
          rows="3"
          required
        ></textarea>
        <div v-if="errors.description" class="text-danger mt-1">{{ errors.description }}</div>
      </div>

      <div class="mb-3">
        <label for="videoUrl" class="form-label">Video URL</label>
        <input type="text" id="videoUrl" v-model="movie.videoUrl" class="form-control" required />
        <div v-if="errors.videoUrl" class="text-danger mt-1">{{ errors.videoUrl }}</div>
      </div>

      <div class="mb-3">
        <label for="releaseDate" class="form-label">Release Date</label>
        <input
          type="date"
          id="releaseDate"
          v-model="movie.releaseDate"
          class="form-control"
          required
        />
        <div v-if="errors.releaseDate" class="text-danger mt-1">{{ errors.releaseDate }}</div>
      </div>

      <div class="mb-3">
        <label for="genre" class="form-label">Genre</label>
        <select id="genre" v-model.number="movie.category.id" class="form-select" required>
          <option value="" disabled>Select a category</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <div v-if="errors.category" class="text-danger mt-1">{{ errors.category }}</div>
      </div>

      <div class="mb-3">
        <label for="duration" class="form-label">Duration (minutes)</label>
        <input
          type="number"
          id="duration"
          v-model="movie.duration"
          class="form-control"
          required
          min="10"
        />
        <div v-if="errors.duration" class="text-danger mt-1">{{ errors.duration }}</div>
      </div>

      <div class="mb-3">
        <label for="rating" class="form-label">Rating</label>
        <input
          type="number"
          id="rating"
          v-model="movie.rating"
          class="form-control"
          required
          min="1"
          max="10"
        />
        <div v-if="errors.rating" class="text-danger mt-1">{{ errors.rating }}</div>
      </div>

      <div class="mb-3">
        <label for="poster" class="form-label">Poster Image</label>
        <input
          type="file"
          id="poster"
          @change="handleFileChange"
          class="form-control"
          accept="image/*"
        />
        <div v-if="posterPreview" class="mt-2">
          <strong>Selected Poster Preview:</strong><br />
          <img
            :src="posterPreview"
            alt="Selected Poster Preview"
            style="max-width: 200px; border-radius: 8px"
          />
        </div>
        <div v-else-if="currentPoster" class="mt-2">
          <strong>Current Poster:</strong><br />
          <img
            :src="getImage(currentPoster)"
            alt="Current Poster"
            style="max-width: 200px; border-radius: 8px"
          />
        </div>
      </div>

      <div v-if="errors.general" class="text-danger mb-3">{{ errors.general }}</div>

      <button type="submit" class="btn btn-primary me-2">Update Movie</button>
      <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { $http } from '@/plugins/http-wrapper'

const router = useRouter()
const route = useRoute()
const categories = ref([])
const errors = reactive({})
const movie = reactive({
  id: null,
  title: '',
  description: '',
  releaseDate: '',
  videoUrl: '',
  category: { id: null },
  duration: '',
  rating: '',
  tokens: 0,
})
const currentPoster = ref(null)
const posterFile = ref(null)
const posterPreview = ref(null)

async function fetchCategories() {
  try {
    const res = await $http.get('/categories/index')
    if (res) {
      categories.value = res
    }
  } catch (e) {
    console.error('Error fetching categories:', e.message)
  }
}

async function fetchMovieDetail() {
  try {
    const movieId = route.params.id
    const res = await $http.get(`movie/detail/${movieId}`)
    if (res) {
      movie.id = res.id
      movie.title = res.title
      movie.description = res.description
      movie.releaseDate = res.releaseDate ? res.releaseDate.split('T')[0] : ''
      movie.videoUrl = res.videoUrl
      movie.category.id = res.category?.id || null
      movie.duration = res.duration
      movie.rating = res.rating
      movie.tokens = res.tokens || 0
      currentPoster.value = res.image || null
    }
  } catch (e) {
    errors.general = 'Failed to load movie details: ' + e.message
  }
}

function handleFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    posterFile.value = file
    if (posterPreview.value) {
      URL.revokeObjectURL(posterPreview.value)
    }
    posterPreview.value = URL.createObjectURL(file)
  }
}

async function handleSubmit() {
  // Clear previous errors
  Object.keys(errors).forEach((key) => delete errors[key])

  // Basic validation
  let hasError = false
  if (!movie.title) {
    errors.title = 'Title is required.'
    hasError = true
  }
  if (!movie.videoUrl) {
    errors.videoUrl = 'Video URL is required.'
    hasError = true
  }
  if (!movie.description) {
    errors.description = 'Description is required.'
    hasError = true
  }
  if (!movie.releaseDate) {
    errors.releaseDate = 'Release date is required.'
    hasError = true
  }
  if (!movie.category.id) {
    errors.category = 'Category is required.'
    hasError = true
  }
  if (!movie.duration) {
    errors.duration = 'Duration is required.'
    hasError = true
  }
  if (!movie.rating) {
    errors.rating = 'Rating is required.'
    hasError = true
  }
  if (hasError) {
    return
  }

  // Additional validation
  if (movie.description.length < 10) {
    errors.description = 'Description must be at least 10 characters long.'
    hasError = true
  }

  if (movie.duration < 10) {
    errors.duration = 'Duration must be at least 10 minutes.'
    hasError = true
  }

  const ratingNum = Number(movie.rating)
  if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 10) {
    errors.rating = 'Rating must be a number between 1 and 10.'
    hasError = true
  }

  // Validate releaseDate is not in the past
  if (hasError) {
    return
  }

  const formData = new FormData()
  const movieData = {
    id: movie.id,
    title: movie.title,
    videoUrl: movie.videoUrl,
    description: movie.description,
    releaseDate: movie.releaseDate,
    duration: movie.duration,
    rating: movie.rating,
    tokens: movie.tokens,
    category: {
      id: movie.category.id,
    },
  }
  formData.append('movie', JSON.stringify(movieData))
  if (posterFile.value) {
    formData.append('imageFile', posterFile.value)
  }

  try {
    await $http.put(`/movie/update/${movie.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    alert('Movie updated successfully!')
    router.push({ name: 'AdminListMovie' })
  } catch (error) {
    errors.general = 'Failed to update movie: ' + error.message
  }
}

function cancel() {
  router.push({ name: 'AdminListMovie' })
}

onMounted(() => {
  fetchCategories()
  fetchMovieDetail()
})

function getImage(imageName) {
  if (!imageName) return ''
  return `http://localhost:8080${imageName.startsWith('/') ? '' : '/'}${imageName}`
}
</script>

<style scoped>
@import '@/assets/css/adminlte.css';

.container {
  max-width: 600px;
}
</style>
