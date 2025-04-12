<template>
  <!-- Banner -->
  <div class="banner" :style="{ backgroundImage: `url(${getImage(movie.image)})` }">
    <div class="banner-overlay"></div>
    <img :src="getImage(movie.image)" class="img-fluid" alt="Võ Luyện Đỉnh Phong" />
  </div>

  <div class="container">
    <div class="card text-white p-3">
      <div class="row">
        <div class="col-md-3">
          <img
            :src="getImage(movie.image)"
            class="img-fluid w-100 movie-image"
            alt="Movie Poster"
          />

          <a class="btn btn-primary mt-3" href="#" role="button">
            <img src="../../assets/img/play-button.jpg" alt="" style="height: 40px; width: 40px" />
          </a>
          <a class="btn btn-success mt-3 ms-2" href="#" role="button">
            <img
              src="../../assets/img/save-button.jpg"
              alt=""
              class="p-1"
              style="height: 40px; width: 40px"
            />
          </a>
        </div>
        <div class="col-md-9">
          <div class="row">
            <h3 class="col">{{ movie.title }}</h3>

            <div class="col-md-3 d-flex align-items-center justify-content-end">
              <button class="btn btn-warning" @click="showRatingModal = true">Đánh giá</button>
            </div>
          </div>
          <p>
            <span class="badge bg-primary">{{ movie.category.name }}</span>
          </p>
          <p><strong>Trạng thái:</strong> {{ movie.status || 'Đang tiến hành' }}</p>
          <p><strong>Điểm:</strong> {{ movie.rating }} / 10</p>
          <p><strong>Phát hành:</strong> {{ movie.year || 2024 }}</p>
          <p><strong>Thời lượng:</strong> {{ totalEpisodes }} tập</p>

          <strong>Mô tả:</strong>
          <p class="movie-description">
            {{ movie.description || 'Không có mô tả.' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Rating Modal -->
    <div v-if="showRatingModal" class="rating-modal">
      <div class="modal-content p-3">
        <h5>Đánh giá phim</h5>
        <div class="stars">
          <span
            v-for="star in 10"
            :key="star"
            class="star"
            :class="{ selected: star <= selectedRating }"
            @click="setRating(star)"
          >
            ★
          </span>
        </div>
        <div class="mt-2">
          <button class="btn btn-primary me-2" @click="submitRating">Xác nhận</button>
          <button class="btn btn-secondary" @click="showRatingModal = false">Hủy</button>
        </div>
      </div>
    </div>

    <!-- season and episode list  -->
    <MovieEpisode :episodes="episodes" />

    <!-- Comments Section -->
    <div class="card text-dark mt-4 p-3">
      <h3>Bình luận</h3>
      <div v-for="(comment, index) in comments" :key="index" class="mb-3 border p-2">
        <div class="d-flex align-items-start">
          <!-- Avatar Image -->
          <img
            :src="comment.avatar || 'https://via.placeholder.com/50'"
            alt="Avatar"
            class="comment-avatar me-2"
          />

          <!-- Comment Content -->
          <div class="comment-content">
            <strong>{{ comment.user }}</strong>
            <p>{{ comment.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recommended Movies Section -->
    <div class="card text-dark mt-4 p-3">
      <h3>Đề Xuất</h3>
      <div class="d-flex overflow-auto">
        <!-- <div class="col-md-3 col-sm-3 col-xs-6 grid-item mb-4 ps-0" v-for="movie in movies" :key="movie.id"> -->
        <!-- <MovieCard :movie="movie" /> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
  <!-- Movie Details -->
</template>

<script>
import { $http } from '@/plugins/http-wrapper'
import MovieEpisode from '@/components/movies/MovieEpisode.vue'
export default {
  components: {
    MovieEpisode,
  },
  data() {
    return {
      totalEpisodes: 0,
      showRatingModal: false,
      selectedRating: 0,
      movie: {},
      episodes: [],
      comments: [
        { user: 'Nguyễn Văn A', text: 'Bộ này hay quá!' },
        { user: 'Trần Thị B', text: 'Mình thích nhân vật chính.' },
      ],
    }
  },
  created() {
    this.fetchMovie()
    this.fetchEpisodes()
  },
  methods: {
    getImage(imageName) {
      return new URL(`../../assets/img/movies/${imageName}`, import.meta.url).href
    },

    setRating(star) {
      this.selectedRating = star
    },
    submitRating() {
      alert(`Bạn đã đánh giá ${this.selectedRating} sao!`)
      this.showRatingModal = false
    },

    async fetchMovie() {
      try {
        let movieId = this.$route.params.id
        const res = await $http.get(`/movie/detail/${movieId}`)
        if (res) {
          this.movie = res
        }
      } catch (error) {
        console.error('Error fetching movie details:', error.message)
      }
    },

    async fetchEpisodes() {
      try {
        let movieId = this.$route.params.id
        const episodesRes = await $http.get(`/episodes/movie/${movieId}`)
        if (episodesRes) {
          this.episodes = episodesRes
          this.totalEpisodes = new Set(this.episodes.map((ep) => ep.episodeNumber)).size
        }
        console.log('Total Episodes:', this.totalEpisodes)
      } catch (error) {
        console.error('Error fetching episodes:', error.message)
      }
    },
  },
}
</script>

<style>
body {
  margin-top: 90px;
}
/* Rating Modal */
.rating-modal {
  display: block;
  position: fixed;
  z-index: 9999;
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

.comment-avatar {
  width: 50px;
  /* Set avatar size */
  height: 50px;
  border-radius: 50%;
  /* Make it round */
  object-fit: cover;
  /* Ensure it covers the area */
}

.comment-content {
  flex: 1;
  /* Take remaining space */
  background: rgba(0, 0, 0, 0.05);
  /* Light background */
  padding: 10px;
  border-radius: 5px;
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
  z-index: 1;
}

.banner img {
  max-height: 105%;
  width: 100%;
  object-fit: cover; /* Ensures the image covers the banner */
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 30px 30px 30px 30px;
}

.banner {
  position: relative;
  width: 100%;
  height: 40vh; /* Adjust the height if needed */
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
