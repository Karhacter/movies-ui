<template>
  <div class="recommend-section">
    <Carousel
      :items-to-show="6"
      :transition="500"
      class="movie-carousel"
      :breakpoints="{
        992: {
          itemsToShow: 4,
        },
        1280: {
          itemsToShow: 6,
        },
      }"
    >
      <Slide v-for="movie in recommendedMovies" :key="movie.id">
        <div class="movie-card">
          <img :src="movie.poster" :alt="movie.title" class="movie-poster" />
          <div class="movie-info">
            <h3 class="movie-title">{{ movie.title }}</h3>
            <div class="movie-rating">
              <span class="rating">★ {{ movie.rating }}/10 Imdb</span>
            </div>
            <p class="movie-year">{{ movie.year }}</p>
          </div>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import img1 from '../../assets/img/project/project1/1.jpg'
import img2 from '../../assets/img/project/project1/2.jpg'
import img3 from '../../assets/img/project/project1/3.jpg'
import img4 from '../../assets/img/project/project1/4.jpg'

const recommendedMovies = ref([
  {
    id: 1,
    title: 'Inception',
    poster: img1,
    rating: 8.8,
    year: 2010,
  },
  {
    id: 2,
    title: 'The Dark Knight',
    poster: img2,
    rating: 9.0,
    year: 2008,
  },
  {
    id: 3,
    title: 'Interstellar',
    poster: img3,
    rating: 8.6,
    year: 2014,
  },
  {
    id: 4,
    title: 'The Matrix',
    poster: img4,
    rating: 8.7,
    year: 1999,
  },
  {
    id: 5,
    title: 'The Matrix',
    poster: img4,
    rating: 8.7,
    year: 1999,
  },
  {
    id: 6,
    title: 'The Matrix',
    poster: img4,
    rating: 8.7,
    year: 1999,
  },
  {
    id: 7,
    title: 'The Matrix',
    poster: img4,
    rating: 8.7,
    year: 1999,
  },
  {
    id: 8,
    title: 'The Matrix',
    poster: img4,
    rating: 8.7,
    year: 1999,
  },
  {
    id: 9,
    title: 'The Matrix',
    poster: img4,
    rating: 8.7,
    year: 1999,
  },
  {
    id: 10,
    title: 'The Matrix',
    poster: img4,
    rating: 8.7,
    year: 1999,
  },
  
])
</script>

<style scoped>
.recommend-section {
  position: relative;
  overflow: hidden;
}

.movie-card {
  background: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  margin: 0;
  width: 220px;
  height: 100%;
}

.movie-card:hover {
  transform: translateY(-5px);
}

.movie-poster {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.movie-info {
  padding: 0.75rem;
}

.movie-title {
  color: #ffffff;
  font-size: 0.9rem;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-rating {
  color: #ffd700;
  margin: 0.25rem 0;
  font-size: 0.85rem;
}

.movie-year {
  color: #b3b3b3;
  margin: 0;
  font-size: 0.8rem;
}

:deep(.carousel__slide) {
  padding: 0 0.25rem;
}

:deep(.carousel__pagination) {
  margin-top: 1rem;
}

:deep(.carousel__pagination-button) {
  background-color: rgba(255, 255, 255, 0.2);
}

:deep(.carousel__pagination-button--active) {
  background-color: #ffffff;
}

@media (max-width: 768px) {
  .movie-poster {
    height: 200px;
  }

  .movie-title {
    font-size: 0.85rem;
  }

  .movie-year {
    font-size: 0.75rem;
  }
}
</style>
