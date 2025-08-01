<template>
  <div class="content-wrapper">
    <div class="movie-detail table-responsive">
      <h1 class="text-danger">Movie Detail</h1>
      <div class="text-end mb-4">
        <router-link to="/admin/movies" class="btn btn-sm btn-info">
          <i class="fa fa-arrow-left"></i> Về Danh Sách
        </router-link>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="!movie && !error" class="loading">Loading movie details...</div>
      <div v-if="movie" class="movie-card">
        <h2 class="movie-title">{{ movie.title }}</h2>
        <div class="movie-content">
          <img :src="getImage(movie.image)" alt="Movie Poster" class="movie-poster" />
          <div class="movie-details">
            <p><strong>Description:</strong> {{ movie.description }}</p>
            <p><strong>Release Date:</strong> {{ formatDate(movie.releaseDate) }}</p>
            <p><strong>Genre:</strong> {{ movie.category?.name || 'N/A' }}</p>
            <p><strong>parentID:</strong> {{ movie.parentID || 'N/A' }}</p>
            <p><strong>Duration:</strong> {{ movie.duration }} minutes</p>
            <p><strong>Rating:</strong> {{ movie.rating }}</p>
            <p><strong>Tokens:</strong> {{ movie.tokens }}</p>
            <p><strong>Slug:</strong> {{ movie.slug || 'N/A' }}</p>
            <p><strong>Status:</strong> {{ movie.statusDelete === 1 ? 'Active' : 'Deleted' }}</p>

            <div v-if="movie.galleryImages && movie.galleryImages.length > 0" class="gallery">
              <strong>Gallery Images:</strong>
              <div class="gallery-images">
                <img
                  v-for="(img, index) in movie.galleryImages"
                  :key="index"
                  :src="getImage(img)"
                  alt="Gallery Image"
                  class="gallery-image"
                  :class="{ selected: selectedImage === img }"
                  @click="selectImage(img)"
                />
              </div>
              <button
                class="btn btn-primary mt-3"
                :disabled="!selectedImage"
                @click="updateMainImage"
              >
                Update Main Image
              </button>
              <div
                v-if="updateMessage"
                :class="{ 'text-success': updateSuccess, 'text-danger': !updateSuccess }"
                class="mt-2"
              >
                {{ updateMessage }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { $http } from '@/plugins/http-wrapper'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'AdminMovieDetail',
  methods: {
    getImage(imageName) {
      if (!imageName) return ''
      return `${import.meta.env.VITE_API_URL}${imageName.startsWith('/') ? '' : '/'}${imageName}`
    },
  },
  setup() {
    const route = useRoute()
    const movieId = route.params.id
    const movie = ref(null)
    const error = ref(null)
    const selectedImage = ref(null)
    const updateMessage = ref('')
    const updateSuccess = ref(false)

    const fetchMovie = async () => {
      console.log('Fetching movie detail for ID:', movieId)
      error.value = null
      try {
        const response = await $http.get(`movie/detail/${movieId}`)
        console.log('API response:', response)
        movie.value = response
      } catch (err) {
        console.error('Error fetching movie detail:', err)
        error.value = 'Failed to load movie details.'
      }
    }

    const selectImage = (img) => {
      selectedImage.value = img
      updateMessage.value = ''
    }

    const updateMainImage = async () => {
      if (!selectedImage.value) {
        updateMessage.value = 'Please select an image from the gallery.'
        updateSuccess.value = false
        return
      }
      try {
        updateMessage.value = ''
        // Send imageUrl as query parameter instead of request body
        const response = await $http.post(
          `/movies/images/${movieId}/main-image?imageUrl=${encodeURIComponent(selectedImage.value)}`
        )
        movie.value.image = selectedImage.value
        updateMessage.value = 'Main image updated successfully.'
        updateSuccess.value = true
      } catch (err) {
        console.error('Error updating main image:', err)
        updateMessage.value = 'Failed to update main image.'
        updateSuccess.value = false
      }
    }

    const formatDate = (dateStr) => {
      const date = new Date(dateStr)
      return date.toLocaleDateString()
    }

    onMounted(() => {
      fetchMovie()
    })

    return {
      movie,
      error,
      formatDate,
      selectedImage,
      updateMessage,
      updateSuccess,
      selectImage,
      updateMainImage,
    }
  },
}
</script>

<style scoped>
@import '@/assets/css/adminlte.css';
.movie-detail {
  padding: 50px;
  margin: 0 20px 0 0;
  max-width: auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
}

.loading,
.error {
  font-size: 1.2em;
  color: #888;
  text-align: center;
  margin: 30px 0;
  font-weight: 500;
}

.movie-card {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.movie-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.movie-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #222;
  border-bottom: 2px solid #007bff;
  padding-bottom: 8px;
}

.movie-content {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.movie-poster {
  width: 200px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.movie-poster:hover {
  transform: scale(1.05);
}

.movie-details {
  flex: 1;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
}

.movie-details p {
  margin: 12px 0;
}

.movie-details strong {
  color: #007bff;
}

.gallery {
  margin-top: 20px;
}

.gallery-images {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.gallery-image {
  width: 100px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.gallery-image:hover {
  transform: scale(1.1);
}

.gallery-image.selected {
  border: 3px solid #007bff;
  transform: scale(1.1);
}

.video-player {
  margin-top: 20px;
}

.movie-video {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
</style>
