<template>
  <div class="movie-detail">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Đang tải...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="retryLoad" class="btn-retry">Thử lại</button>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Hero Section -->
      <div
        class="hero-section"
        :style="movie?.coverImage ? { backgroundImage: `url(${movie.coverImage})` } : {}"
      >
        <div class="overlay">
          <div class="container">
            <div class="content-wrapper">
              <div class="poster" v-if="movie">
                <img :src="movie.image" :alt="movie.title" />
              </div>
              <div class="info" v-if="movie">
                <h1>{{ movie.title }}</h1>
                <div class="meta">
                  <span class="rating">
                    <i class="fas fa-star"></i>
                    {{ movie.rating }}
                  </span>
                  <span class="year">{{ movie.year }}</span>
                  <span class="duration">{{ movie.duration }}</span>
                </div>
                <div class="genres">
                  <span v-for="genre in movie.genres" :key="genre" class="genre-tag">
                    {{ genre }}
                  </span>
                </div>
                <div class="actions">
                  <button class="btn-watch"><i class="fas fa-play"></i> Xem Ngay</button>
                  <button class="btn-action">
                    <i class="fas fa-heart"></i>
                  </button>
                  <button class="btn-action">
                    <i class="fas fa-plus"></i>
                  </button>
                  <button class="btn-action">
                    <i class="fas fa-share"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="container content-section" v-if="movie">
        <div class="tabs">
          <button
            v-for="tab in tabs"
            :key="tab"
            :class="['tab-btn', { active: currentTab === tab }]"
            @click="currentTab = tab"
          >
            {{ tab }}
          </button>
        </div>

        <div class="tab-content" v-if="currentTab === 'Tập phim'">
          <div class="episodes-grid">
            <button
              v-for="ep in episodes"
              :key="ep.number"
              class="episode-btn"
              :class="{ active: ep.number === currentEpisode }"
            >
              Tập {{ ep.number }}
            </button>
          </div>
        </div>

        <div class="tab-content" v-else-if="currentTab === 'Thông tin'">
          <div class="description">
            <h3>Nội dung phim</h3>
            <p>{{ movie.description }}</p>
          </div>
          <div class="details">
            <div class="detail-item">
              <span class="label">Đạo diễn:</span>
              <span>{{ movie.director }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Diễn viên:</span>
              <span>{{ movie.cast.join(', ') }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Thể loại:</span>
              <span>{{ movie.genres.join(', ') }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { $http } from '@/plugins/http-wrapper'

interface Movie {
  id: number
  title: string
  image: string
  coverImage: string
  rating: number
  year: string
  duration: string
  genres: string[]
  description: string
  director: string
  cast: string[]
  slug: string
}

interface Episode {
  number: number
  title: string
  url: string
}

const route = useRoute()
const router = useRouter()
const movie = ref<Movie | null>(null)
const episodes = ref<Episode[]>([])
const currentEpisode = ref(1)
const currentTab = ref('Tập phim')
const tabs = ['Tập phim', 'Gallery', 'Diễn viên', 'Đề xuất']
const loading = ref(true)
const error = ref<string | null>(null)

// Extract the ID from the slug (assuming slug format is "title-123")
const getIdFromSlug = (slug: string) => {
  const matches = slug.match(/-(\d+)$/)
  return matches ? matches[1] : slug
}

const fetchMovieDetail = async () => {
  try {
    loading.value = true
    error.value = null
    const movieId = getIdFromSlug(route.params.slug as string)
    const response = await $http.get<Movie>(`/movies/detail/${movieId}`)
    movie.value = response

    // Update URL with proper slug if it's different
    if (movie.value && route.params.slug !== movie.value.slug) {
      router.replace({
        name: 'movie-detail',
        params: { slug: movie.value.slug },
      })
    }
  } catch (err) {
    error.value = 'Không thể tải thông tin phim. Vui lòng thử lại sau.'
    console.error('Error fetching movie details:', err)
  } finally {
    loading.value = false
  }
}

const fetchEpisodes = async () => {
  try {
    const movieId = getIdFromSlug(route.params.slug as string)
    const response = await $http.get<Episode[]>(`/movies/${movieId}/episodes`)
    episodes.value = response
  } catch (err) {
    console.error('Error fetching episodes:', err)
  }
}

const retryLoad = () => {
  fetchMovieDetail()
  fetchEpisodes()
}

onMounted(() => {
  fetchMovieDetail()
  fetchEpisodes()
})
</script>

<style scoped>
.movie-detail {
  background-color: #1a1a1a;
  min-height: 100vh;
  color: white;
  padding-top: 80px; /* Add space for header */
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.hero-section {
  position: relative;
  height: 70vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  margin-top: -80px; /* Offset the padding-top */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.8) 50%,
    rgba(0, 0, 0, 0.95) 100%
  );
  display: flex;
  align-items: flex-end;
}

.content-wrapper {
  display: flex;
  gap: 2rem;
  padding: 2rem 0;
  margin-bottom: 2rem;
  width: 100%;
}

.poster {
  flex-shrink: 0;
  width: 300px;
  height: 450px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  flex: 1;
  padding-top: 2rem;
}

.info h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.rating {
  color: #ffc107;
}

.genres {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.genre-tag {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.actions {
  display: flex;
  gap: 1rem;
}

.btn-watch {
  background-color: #e50914;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-watch:hover {
  background-color: #f6121d;
}

.btn-action {
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-action:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.content-section {
  padding: 2rem 0;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
}

.tab-btn {
  background: none;
  border: none;
  color: #999;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: color 0.3s;
}

.tab-btn.active {
  color: white;
  position: relative;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1rem;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #e50914;
}

.episodes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.episode-btn {
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 1rem;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.episode-btn.active {
  background-color: #e50914;
}

.episode-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.description {
  margin-bottom: 2rem;
}

.description h3 {
  margin-bottom: 1rem;
  color: #e50914;
}

.details {
  display: grid;
  gap: 1rem;
}

.detail-item {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1rem;
}

.detail-item .label {
  color: #999;
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }

  .poster {
    width: 200px;
    height: 300px;
    margin: 0 auto;
  }

  .info {
    text-align: center;
  }

  .genres,
  .actions {
    justify-content: center;
  }
}

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);
  text-align: center;
  padding: 2rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #e50914;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.btn-retry {
  background-color: #e50914;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
}

.btn-retry:hover {
  background-color: #f6121d;
}
</style>
