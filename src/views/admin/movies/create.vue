<template>
  <div class="content-wrapper p-5">
    <h2>Create New Movie</h2>
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
        <label for="duration" class="form-label"
          >ParentID ( Leave if you don't want to set up)</label
        >
        <input type="number" id="parentID" v-model="movie.parentID" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="genre" class="form-label">Genres</label>
        <select id="genre" v-model="movie.categoryIds" class="form-select" multiple required>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <div v-if="errors.categoryIds" class="text-danger mt-1">{{ errors.categoryIds }}</div>
        <div class="selected-categories mt-2">
          <span v-for="catId in movie.categoryIds" :key="catId" class="badge bg-primary me-1">
            {{ categories.find((cat) => cat.id === catId)?.name || 'Unknown' }}
          </span>
        </div>
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
      </div>

      <div v-if="errors.general" class="text-danger mb-3">{{ errors.general }}</div>

      <button type="submit" class="btn btn-primary me-2">Create Movie</button>
      <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { $http } from '@/plugins/http-wrapper'

const router = useRouter()
const categories = ref([])
const errors = reactive({})
const movie = reactive({
  title: '',
  description: '',
  releaseDate: '',
  videoUrl: '',
  categoryIds: [],
  duration: '',
  parentID: '',
  rating: '',
  tokens: 0,
})

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
function handleFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    movie.posterFile = file
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
    if (!movie.categoryIds.length) {
      errors.categoryIds = 'At least one category is required.'
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
    const today = new Date()
    const releaseDate = new Date(movie.releaseDate)
    if (releaseDate < today) {
      errors.releaseDate = 'Release date cannot be in the past.'
      hasError = true
    }

    if (hasError) {
      return
    }

    const formData = new FormData()
    const movieData = {
      title: movie.title,
      videoUrl: movie.videoUrl,
      description: movie.description,
      releaseDate: movie.releaseDate,
      duration: movie.duration,
      rating: movie.rating,
      parentID: movie.parentID === '' ? null : Number(movie.parentID),
      tokens: 0,
      categories: movie.categoryIds.map((id) => ({ id: Number(id) })),
    }
    formData.append('movie', JSON.stringify(movieData))
    if (movie.posterFile) {
      formData.append('imageFile', movie.posterFile)
    }

    try {
      const savedMovie = await $http.post('/movies/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      alert('Movie created successfully!')
      router.push({ name: 'AdminListMovie' })
    } catch (error) {
      errors.general = 'Failed to create movie: ' + error.message
    }
  }

function cancel() {
  router.push({ name: 'AdminListMovie' })
}
onMounted(() => {
  fetchCategories()
})
</script>

<style scoped>
@import '@/assets/css/adminlte.css';

.container {
  max-width: 600px;
}
#genre {
  min-height: 120px;
  font-size: 1rem;
  padding: 0.375rem 0.75rem;
}
</style>
