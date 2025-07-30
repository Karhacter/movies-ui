<template>
  <div class="banner">
    <div class="banner-content">
      <div class="content-wrapper">
        <transition name="slide-fade" mode="out-in">
          <div class="content-left" v-if="currentMovie" :key="currentMovie.id">
            <div class="movie-title">
              <h1>{{ currentMovie.title }}</h1>
            </div>

            <div class="movie-meta">
              <span class="rating"
                >IMDb <strong>{{ currentMovie.rating }}</strong></span
              >
              <span class="year">{{ currentMovie.releaseDate }}</span>
              <span class="episode"
                >Phần {{ currentMovie.season_number || currentMovie.seasonNumber || 'N/A' }}</span
              >

              <span class="current-episode" v-if="currentMovie.episode"
                >Tập {{ currentMovie.episode }}</span
              >
            </div>

            <div class="tags">
              <span v-for="category in currentMovie.categories" :key="category.id" class="tag">
                {{ category.name }}
              </span>
            </div>

            <p class="description">
              {{ currentMovie.description }}
            </p>

            <div class="controls">
              <button class="play-btn" @click="handlePlay(currentMovie.slug)">
                <span class="play-icon">▶</span>
              </button>
              <button class="favorite-btn" @click="handleFavorite">
                <span class="heart-icon">♡</span>
              </button>
              <button class="info-btn" @click="handleInfo(currentMovie.slug)">
                <span class="info-icon">ⓘ</span>
              </button>
            </div>
          </div>
        </transition>
        <div class="thumbnails">
          <div
            v-for="(movie, index) in banners"
            :key="movie.id"
            class="thumbnail"
            :class="{ active: currentIndex === index }"
            :style="{ backgroundImage: `url(${getImage(movie.image)})` }"
            @click="setCurrentMovie(index)"
          ></div>
        </div>
        <hr class="hr-line" />
      </div>

      <div class="movie-poster">
        <div class="cover-img">
          <img :src="getImage(currentMovie.image)" :alt="currentMovie.image" />
        </div>
      </div>
    </div>

    <div class="recommend-new-movies">
      <h4 class="text-warning">Bạn Đang Tìm Kiếm Điều Gì ?</h4>
    </div>
  </div>
</template>

<script>
import { $http } from '@/plugins/http-wrapper'

export default {
  data() {
    return {
      banners: [],
      currentIndex: 0,
      currentMovie: [],
    }
  },
  mounted() {
    this.FetchBanner()
  },
  methods: {
    getImage(imageName) {
      return `${process.env.VITE_API_URL}${imageName}`
    },
    async FetchBanner() {
      const response = await $http.get('/movies/top-new', { limit: 5 })
      if (response) {
        this.banners = response
        this.currentMovie = this.banners[0]
        console.log('Movies fetched:', this.banners)
      } else {
        console.warn('No movies found in response')
        this.banners = []
        this.currentMovie = null
      }
    },

    setCurrentMovie(index) {
      this.currentIndex = index
      this.currentMovie = this.banners[index]
    },

    handlePlay(slug) {
      this.$router.push({ path: `/movie/play/${slug}/ep-1` })
    },

    handleFavorite() {
      console.log('Added to favorites:', this.currentMovie?.title)
    },
    handleInfo(slug) {
      this.$router.push({ path: `/movie/${slug}` })
    },
  },
}
</script>
<style scoped>
.banner {
  position: relative;
  width: 100%;
  height: 88vh;
  color: white;
  overflow: hidden;
}

.banner-content {
  /* position: relative; */
  z-index: 2;
  display: flex;
  height: 95%;
  background: transparent;
}

.content-wrapper {
  width: 100%;
  padding-top: 10%;
  padding-left: 4%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 2;
}

/* content left */
.content-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

/* movie poster */
.movie-poster {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
  display: block;
  z-index: 1;
  overflow: hidden;
}

.cover-img {
  width: 100%;
  height: 100%;
  position: relative;
}

.cover-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  transition: transform 0.3s ease;
}

.cover-img::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%),
    linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8) 100%);
  z-index: 2;
}

.fade-in .visible {
  opacity: 1;
  filter: blur(0);
}
/* movie title */
.movie-title {
  margin-bottom: 2rem;
}

.movie-title h1 {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.movie-title h2 {
  font-size: 1rem;
  margin: 0;
  opacity: 0.9;
}

.movie-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.movie-meta span {
  padding: 0.3rem 0.6rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-size: 0.9rem;
}

.rating strong {
  color: #ffd700;
}

.tags {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.tag {
  padding: 0.4rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-size: 0.9rem;
}

.description {
  font-size: 1rem;
  line-height: 1.2;
  margin-bottom: 1rem;
  opacity: 0.9;
  max-width: 600px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.controls button {
  padding: 1rem 1.5rem;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.controls button:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.3);
}

.play-btn {
  background: #ffd700 !important;
  color: black !important;
}

.play-btn:hover {
  background: #ffed4a !important;
}

.thumbnails {
  position: absolute;
  right: -90px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  z-index: 5;
  padding: 0.6rem;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: right 0.3s ease-out;
}

.thumbnails::before {
  content: '';
  position: absolute;
  right: 100%;
  top: 0;
  width: 20px;
  height: 100%;
}

.thumbnails:hover {
  right: 1.5rem;
}

.thumbnail {
  width: 80px;
  height: 40px;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  flex-shrink: 0;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s ease-out;
  position: relative;
  overflow: hidden;
}

.thumbnail::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
  opacity: 0;
  transition: opacity 0.2s ease;
}

.thumbnail:hover::after {
  opacity: 1;
}

.thumbnail.active {
  border-color: #ffd700;
  transform: scale(1.03) translateX(-3px);
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.2);
}

.thumbnail:hover {
  border-color: rgba(255, 255, 255, 0.6);
  transform: scale(1.02) translateX(-2px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

@media (max-width: 1024px) {
  .thumbnails {
    right: -80px;
  }

  .thumbnails:hover {
    right: 1rem;
  }

  .thumbnail {
    width: 100px;
    height: 55px;
  }
}

@media (max-width: 768px) {
  .thumbnails {
    position: relative;
    right: auto;
    top: auto;
    transform: none;
    flex-direction: row;
    overflow-x: auto;
    background: rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(4px);
    padding: 0.5rem;
    margin: 0 -1rem;
    border-radius: 0;
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: none;
    opacity: 0.6;
    transition: opacity 0.3s ease-out;
  }

  .thumbnails:hover {
    opacity: 1;
    right: auto;
  }

  .thumbnail {
    width: 70px;
    height: 40px;
  }

  .thumbnail.active {
    transform: scale(1.02);
  }

  .thumbnail:hover {
    transform: scale(1.01);
  }
}

@media (max-width: 480px) {
  .thumbnail {
    width: 60px;
    height: 34px;
  }
}

.recommend-new-movies {
  z-index: 3;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem 3rem 1rem 2.5rem;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
}
@media (max-width: 1024px) {
  .content-wrapper {
    width: 65%;
  }

  .movie-title h1 {
    font-size: 2.5rem;
  }

  .movie-meta {
    gap: 0.5rem;
  }

  .movie-meta span {
    font-size: 0.8rem;
  }

  .thumbnail {
    width: 100px;
    height: 55px;
  }
}

@media (max-width: 768px) {
  .banner-content {
    flex-direction: column;
  }

  .content-wrapper {
    width: 100%;
    padding: 1rem;
    margin-top: auto;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  }

  .content-left {
    z-index: 2;
    font-size: 10px;
  }

  .movie-title h1 {
    font-size: 2rem;
  }

  .movie-meta {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    gap: 0.3rem;
  }

  .movie-meta span {
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
    white-space: nowrap;
  }

  .movie-meta .year,
  .movie-meta .age-rating {
    display: none;
  }

  .description {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    max-height: 3.2em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .movie-poster {
    display: block;
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
  }

  .controls {
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .controls button {
    padding: 0.8rem 1.2rem;
  }

  .recommend-new-movies {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .movie-meta .episode,
  .movie-meta .current-episode {
    display: none;
  }

  .movie-title h1 {
    font-size: 1.5rem;
  }

  .controls button {
    padding: 0.6rem 1rem;
  }

  .thumbnail {
    width: 50px;
    height: 25px;
  }
}

/* Add these new transition styles */
.slide-fade-enter-active {
  transition: all 0.5s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
