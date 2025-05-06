<template>
  <div class="banner">
    <div class="banner-overlay"></div>
    <img :src="getImage(movie.image)" class="img-fluid" alt="{movie.image}" />
  </div>

  <div class="container">
    <MovieInfo :movie="movie" :totalEpisodes="totalEpisodes" />

    <div v-if="seasons.length > 1" class="card text-dark mt-3 p-3">
      <h4>Phim Liên Kết</h4>
      <div class="episode-list">
        <div class="episode-item" v-for="season in seasons" :key="season.id">
          <router-link class="season-button text-center" :to="`/movie/${season.slug}`">
            Phần {{ season.seasonNumber }}
          </router-link>
        </div>
      </div>
    </div>
    <MovieEpisode :episodes="episodes" />

    <!-- Comments Section -->
    <CommentMovie :movie="movie" />
    <!-- Recommended Movies Section -->
    <div class="card text-dark mt-4 p-3">
      <h3>Đề Xuất</h3>
      <div class="d-flex overflow-auto">
        <!-- Movie Else -->
      </div>
    </div>
  </div>
  <!-- Movie Details -->
</template>

<script>
import { $http } from '@/plugins/http-wrapper'
import MovieEpisode from '@/components/movies/MovieEpisode.vue'
import MovieInfo from '@/components/movies/MovieInfo.vue'
import CommentMovie from '@/components/movies/CommentMovie.vue'

export default {
  components: {
    MovieEpisode,
    MovieInfo,
    CommentMovie,
  },
  data() {
    return {
      totalEpisodes: 0,
      movie: {},
      episodes: [],
      comments: [],
      loading: false,
      error: null,
      seasons: [],
      newCommentContent: '',
    }
  },

  watch: {
    '$route.params.slug': {
      immediate: true,
      handler: async function (newSlug, oldSlug) {
        if (newSlug !== oldSlug) {
          await this.fetchMovie()
          this.fetchEpisode()
        }
      },
    },
  },
  methods: {
    // action get image
    getImage(imageName) {
      return `http://localhost:8080${imageName}`
    },
    // action fetch movie

    async fetchMovie() {
      this.loading = true
      this.error = null
      try {
        const parentID = this.$route.query.parentID
        const season = this.$route.query.season
        if (parentID && season) {
          console.log('Fetching movie with parentID and season:', parentID, season)
          const res = await $http.get(`/movies/${parentID}/season/${season}`)
          if (res) {
            this.movie = res
            console.log('Movie data fetched by parentID and season:', this.movie)
            this.fetchSeasons(parentID)
          } else {
            this.error = 'Movie not found'
            console.error('Movie not found for parentID and season:', parentID, season)
          }
        } else {
          let movieId = this.$route.params.slug
          console.log('Fetching movie with slug:', movieId)
          const res = await $http.get(`/movie/slug/${movieId}`)
          if (res) {
            this.movie = res
            this.fetchSeasons(this.movie.parent_id || this.movie.parentID)
          } else {
            this.error = 'Movie not found'
            console.error('Movie not found for slug:', movieId)
          }
        }
      } catch (error) {
        this.error = 'Error fetching movie details'
        console.error('Error fetching movie details:', error.message)
      } finally {
        this.loading = false
      }
    },
    // action fetch Season if movie is even
    async fetchSeasons(parentID) {
      if (!parentID) {
        this.seasons = []
        return
      }
      try {
        const res = await $http.get(`/movies/${parentID}/seasons`)
        if (res) {
          this.seasons = res
          console.log('Seasons fetched:', this.seasons)
        } else {
          this.seasons = []
          console.error('No seasons found for parentID:', parentID)
        }
      } catch (error) {
        this.seasons = []
        console.error('Error fetching seasons:', error.message)
      }
    },

    // action fetch Episode
    async fetchEpisode() {
      try {
        const resEp = await $http.get(`/episodes/movie/${this.movie.id}`)
        if (resEp) {
          this.episodes = resEp
          this.totalEpisodes = resEp.length
        }
      } catch (error) {
        console.error('Error fetching seasons and episodes:', error.message)
      }
    },
  },
}
</script>

<style scoped>
.episode-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); /* Makes the grid responsive */
  gap: 10px; /* Space between the items */
  padding: 10px;
}

.episode-item {
  display: flex;
  justify-content: center; /* Centers the buttons */
}

.season-button {
  width: 100%; /* Makes the button fill its parent container */
  padding: 10px;
  font-size: 1rem bold;

  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: transparent;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.season-button:hover {
  background-color: #f0f0f0;
  border-color: #888;
}

.season-button {
  color: white;
  border-color: black;
  background-color: black;
}

.season-button:hover {
  background-color: #4bb7ed;
}

/* Rating Modal */
.rating-modal {
  display: block;
  position: fixed;
  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.stars {
  font-size: 2rem;
}

.star {
  cursor: pointer;
  color: gray;
  transition: color 0.3s;
}

.star:hover,
.star.selected {
  color: darkorange;
}

.movie-description {
  max-height: 150px;
  /* Set a fixed height */
  overflow-y: auto;
  /* Enable vertical scrolling */
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  /* Slight background for readability */
  border-radius: 5px;
  /* Rounded corners */
  line-height: 1.5;
}

.movie-image {
  height: 70%;
}
/* Banner css */

.banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 105%;
  background: rgba(34, 5, 5, 0.5); /* Black overlay with 50% opacity */
  z-index: 2;
}

.banner img {
  max-height: 105%;
  width: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 30px 30px 30px 30px;
}

.banner {
  position: relative;
  width: 100%;
  height: 50vh; /* Adjust the height if needed */
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-overlay {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9));
}
</style>
