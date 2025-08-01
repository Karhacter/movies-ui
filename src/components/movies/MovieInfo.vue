<template>
  <div class="card text-white p-3 mb-3" style="z-index: 8">
    <div class="row">
      <div class="col-md-3">
        <img :src="getImage(movie.image)" class="img-fluid w-100 movie-image" alt="Movie Poster" />

        <button class="btn btn-primary mt-3" role="button" @click="playMovie">
          <i class="fa fa-play fa-3x" style="height: 40px; width: 40px"></i>
        </button>
        <button
          v-if="!inWatchlist"
          class="btn btn-success mt-3 ms-2 pb-2"
          @click.prevent="addToWatchlist"
          title="Add to Watchlist"
        >
          <i class="fa-solid fa-bookmark fa-3x" style="height: 40px; width: 40px"></i>
        </button>

        <button
          v-else
          class="btn btn-danger mt-3 ms-2 pb-2"
          @click.prevent="removeFromWatchlist"
          title="Remove from Watchlist"
        >
          <i class="fa-regular fa-bookmark fa-3x" style="height: 40px; width: 40px"></i>
        </button>
      </div>
      <div class="col-md-9">
        <div class="row">
          <h3 class="col">{{ movie.title }}</h3>

          <div class="col-md-3 d-flex align-items-center justify-content-end">
            <button class="btn btn-warning" @click="showRatingModal = true">Đánh giá</button>
          </div>
        </div>
        <p>
          <span
            v-for="category in movie.categories"
            :key="category.id"
            class="badge bg-primary me-1"
          >
            {{ category.name }}
          </span>
        </p>
        <p><strong>Trạng thái:</strong> {{ movie.status || 'Đang tiến hành' }}</p>
        <p><strong>Season:</strong> {{ movie.season_number || movie.seasonNumber || 'N/A' }}</p>
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
</template>

<script>
import { $http } from '@/plugins/http-wrapper'

export default {
  props: {
    movie: Object,
    totalEpisodes: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      userID: null,
      showRatingModal: false,
      selectedRating: 0,
      inWatchlist: false,
    }
  },
  async mounted() {
    await this.fetchUserInfor()
  },
  watch: {
    movie: {
      immediate: true,
      handler(newMovie) {
        if (newMovie && newMovie.id) {
          this.checkWatchlistStatus()
        }
      },
    },
  },
  methods: {
    // fetch user to get the watchlist
    async fetchUserInfor() {
      try {
        const res = await $http.get('/auth/userinfo')
        if (res) {
          this.user = res
          this.userID = res.userID
          return res.userID
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
      return null
    },
    // url to get images
    getImage(imageName) {
return `${import.meta.env.VITE_API_URL}${imageName}`
    },

    // action to check that movie is in watchlist ?
    async checkWatchlistStatus() {
      try {
        const response = await $http.get('/watchlists/status', {
          userId: this.userID,
          movieId: this.movie.id,
        })
        this.inWatchlist = response.inWatchlist
      } catch (error) {
        console.error('Failed to check watchlist status:', error.message || error)
      }
    },
    // the action add to watchlist

    async addToWatchlist() {
      if (!this.userID) {
        alert('Vui Lòng Đăng Nhập!')
        window.location.href = '/'
      }
      try {
        await $http.post('/watchlists/add', {
          userId: this.userID,
          movieId: this.movie.id,
        })
        this.inWatchlist = true
        alert('Movie added to watchlist successfully!')
      } catch (error) {
        alert(error.response.message || 'Xin Vui Lòng Thử Lại Sau')
      }
    },

    // action for remove watchlist
    async removeFromWatchlist() {
      try {
        await $http.delete('/watchlists/remove', {
          userId: this.userID,
          movieId: this.movie.id,
        })
        this.inWatchlist = false
        alert('Movie removed from watchlist.')
      } catch (error) {
        alert(error.response?.message || 'Failed to remove movie from watchlist.')
      }
    },

    async playMovie() {
      if (this.userID) {
        try {
          await $http.post('/history/save', {
            userId: this.userID,
            movieId: this.movie.id,
            watchProgress: 0,
          })
          this.$router.push(`/movie/play/${this.movie.slug}/ep-1`)
        } catch (error) {
          alert('Failed to save watch history. Please try again.')
        }
      } else {
        this.$router.push(`/movie/play/${this.movie.slug}/ep-1`)
      }
    },

    setRating(star) {
      this.selectedRating = star
    },

    submitRating() {
      alert(`Bạn đã đánh giá ${this.selectedRating} sao!`)
      this.showRatingModal = false
    },
  },
}
</script>

<style scoped>
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
</style>
