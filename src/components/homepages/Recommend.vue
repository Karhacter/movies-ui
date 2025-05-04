<template>
  <div class="recommend-section container-fluid">
    <div class="recommend-new-movies">
      <h4 class="ps-4 pt-5 text-warning">Phim Mới Ra Mắt</h4>
    </div>
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
      <Slide v-for="movie in movies" :key="movie.id">
        <MovieCard :movie="movie" />
      </Slide>
    </Carousel>
    <p v-if="movies.length === 0" class="no-movies-message">No movies found to display.</p>

    <h4 class="pt-5 ps-4 text-warning">Top Phim Hành Động Mới Ra Lò</h4>
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
      <Slide v-for="movie in categoryMovies" :key="movie.id">
        <MovieCard :movie="movie" />
      </Slide>
    </Carousel>
    <p v-if="categoryMovies.length === 0" class="no-movies-message">
      No action movies found to display.
    </p>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import MovieCard from '@/components/movies/MovieCard.vue'
import { $http } from '@/plugins/http-wrapper'

export default {
  components: {
    Carousel,
    Slide,
    MovieCard,
  },
  data() {
    return {
      movies: [],
      categoryMovies: [],
    }
  },
  methods: {
    async fetchMovies() {
      try {
        console.log('Fetching top new movies...')
        const response = await $http.get('/movies/top-new')
        if (response) {
          this.movies = response
          console.log('Movies fetched:', this.movies)
        } else {
          console.warn('No movies found in response')
          this.movies = []
        }
      } catch (error) {
        console.error('Error fetching movies:', error)
        this.movies = []
      }
    },
    async fetchMoviesByCategory() {
      try {
        console.log('Fetching top new action movies...')
        const response = await $http.get('/movies/top-new/category/Action')
        if (response) {
          this.categoryMovies = response
          console.log('Category movies fetched:', this.categoryMovies)
        } else {
          console.warn('No category movies found in response')
          this.categoryMovies = []
        }
      } catch (error) {
        console.error('Error fetching category movies:', error)
        this.categoryMovies = []
      }
    },
  },
  mounted() {
    this.fetchMovies()
    this.fetchMoviesByCategory()
  },
}
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

.no-movies-message {
  color: #fff;
  text-align: center;
  margin-top: 1rem;
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
