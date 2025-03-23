<template>
  <div class="banner">
    <div class="banner-content">
      <div class="content-wrapper">
        <transition name="slide-fade" mode="out-in">
          <div class="content-left" :key="currentMovie.id">
            <div class="movie-title">
              <h1>{{ currentMovie.title }}</h1>
            </div>

            <div class="movie-meta">
              <span class="rating"
                >IMDb <strong>{{ currentMovie.imdbRating }}</strong></span
              >
              <span class="age-rating">{{ currentMovie.ageRating }}</span>
              <span class="year">{{ currentMovie.year }}</span>
              <span class="episode" v-if="currentMovie.season">Phần {{ currentMovie.season }}</span>
              <span class="current-episode" v-if="currentMovie.episode"
                >Tập {{ currentMovie.episode }}</span
              >
            </div>

            <div class="tags">
              <span class="tag" v-for="tag in currentMovie.tags" :key="tag">{{ tag }}</span>
            </div>

            <p class="description">
              {{ currentMovie.description }}
            </p>

            <div class="controls">
              <button class="play-btn" @click="handlePlay">
                <span class="play-icon">▶</span>
              </button>
              <button class="favorite-btn" @click="handleFavorite">
                <span class="heart-icon">♡</span>
              </button>
              <button class="info-btn" @click="handleInfo">
                <span class="info-icon">ⓘ</span>
              </button>
            </div>
          </div>
        </transition>

        <div class="thumbnails">
          <div
            v-for="(movie, index) in movies"
            :key="movie.id"
            class="thumbnail"
            :class="{ active: currentIndex === index }"
            :style="{ backgroundImage: `url(${movie.thumbnail})` }"
            @click="setCurrentMovie(index)"
          ></div>
        </div>
        <hr class="hr-line" />
      </div>

      <div class="movie-poster">
        <div class="cover-img">
          <img :src="currentMovie.backgroundImage" alt="movie poster" />
        </div>
      </div>
    </div>

    <div class="recommend-new-movies">
      <h5 class="ps-4 container-fluid">Recommend New Movies</h5>
    </div>
  </div>
</template>

<script setup lang="ts">
import img1 from '@/assets/img/project/project1/2.jpg'
import img2 from '@/assets/img/project/project1/1.jpg'
import img3 from '@/assets/img/project/project1/3.jpg'
import { ref } from 'vue'
interface Movie {
  id: number
  title: string
  imdbRating: number
  ageRating: string
  year: number
  season?: number
  episode?: number
  tags: string[]
  description: string
  backgroundImage: string
  thumbnail: string
}

const movies = ref<Movie[]>([
  {
    id: 1,
    title: 'DAREDEVIL',

    imdbRating: 8.7,
    ageRating: 'T18',
    year: 2025,
    season: 1,
    episode: 4,
    tags: ['Chính Kịch', 'Hình Sự', 'Siêu Anh Hùng', 'Marvel'],
    description:
      'Matt Murdock, một luật sư mù với khả năng đặc biệt, chiến đấu cho công lý thông qua công ty luật sắm ướt của mình. Trong khi cựu trùm mafia Wilson Fisk theo đuổi những nỗ lực chính trị của riêng mình ở New York. Khi quá khứ của họ bắt đầu lộ diện, cả hai...',
    backgroundImage: img1,
    thumbnail: img2,
  },
  {
    id: 2,
    title: 'STRANGER THINGS',
    imdbRating: 8.9,
    ageRating: 'T16',
    year: 2024,
    season: 5,
    episode: 1,
    tags: ['Kinh Dị', 'Viễn Tưởng', 'Phiêu Lưu'],
    description:
      'Hawkins đối mặt với mối đe dọa lớn nhất từ trước đến nay khi những bí mật của Upside Down được hé lộ. Nhóm bạn phải một lần nữa đoàn kết để bảo vệ thị trấn và những người họ yêu thương...',
    backgroundImage: img2,
    thumbnail: img1,
  },
  {
    id: 3,
    title: 'STRANGER THINGS',
    imdbRating: 8.9,
    ageRating: 'T16',
    year: 2024,
    season: 5,
    episode: 1,
    tags: ['Kinh Dị', 'Viễn Tưởng', 'Phiêu Lưu'],
    description:
      'Hawkins đối mặt với mối đe dọa lớn nhất từ trước đến nay khi những bí mật của Upside Down được hé lộ. Nhóm bạn phải một lần nữa đoàn kết để bảo vệ thị trấn và những người họ yêu thương...',
    backgroundImage: img3,
    thumbnail: img3,
  },
  // Add more movies as needed
])

const currentIndex = ref(0)
const currentMovie = ref(movies.value[0])

const setCurrentMovie = (index: number) => {
  currentIndex.value = index
  currentMovie.value = movies.value[index]
}

const handlePlay = () => {
  // Implement play functionality
  console.log('Playing:', currentMovie.value.title)
}

const handleFavorite = () => {
  // Implement favorite functionality
  console.log('Added to favorites:', currentMovie.value.title)
}

const handleInfo = () => {
  // Implement info functionality
  console.log('Showing info for:', currentMovie.value.title)
}
</script>

<style scoped>
.banner {
  position: relative;
  width: 100%;
  height: 96vh;
  color: white;
  overflow: hidden;
}

.banner-content {
  position: relative;
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
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
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
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1));
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
