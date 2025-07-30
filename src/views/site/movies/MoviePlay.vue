<template>
  <div class="video-container pt-5 mt-5">
  <video ref="videoPlayer" class="video" controls></video>

    <div class="extra-controls">
      <button class="btn btn-no-ads"><i class="fa fa-ban" aria-hidden="true"></i> Ads</button>
      <!-- <button class="btn btn-download"><i class="fa fa-download"></i> Tải Phim</button> -->
      <button class="btn btn-next-episode" @click="nextEpisode">
        <i class="fa fa-arrow-right"></i> Tập tiếp theo
      </button>
    </div>
    <div class="container">
      <MovieEpisode :episodes="episodes" :slug="movie.slug" />
    </div>

    <div class="comments-section">
      <CommentMovie :movie="movie" />
    </div>
  </div>
</template>

<script>
import Hls from 'hls.js'
import { $http } from '@/plugins/http-wrapper'
import MovieEpisode from '@/components/movies/MovieEpisode.vue'
import CommentMovie from '@/components/movies/CommentMovie.vue'

export default {
  components: {
    MovieEpisode,
    CommentMovie,
  },
  data() {
    return {
      movie: {},
      episodes: [],
      isPlaying: false,
      hls: null,
      isHls: false,
      videoSrc: '',
      baseUrl: 'http://localhost:8080',
    }
  },
  async mounted() {
    this.loadEpisode()
    this.fetchEpisode()
    await this.fetchMovie()
    this.fetchEpisode()
  },
  watch: {
    '$route.params.id': 'loadEpisode',
  },
  methods: {
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
    async fetchMovie() {
      let movieId = this.$route.params.slug
      const res = await $http.get(`/movie/slug/${movieId}`)
      if (res) {
        this.movie = res
      } else {
        this.error = 'Movie not found'
        console.error('Movie not found for slug:', movieId)
      }
    },

    async loadEpisode() {
      const epId = this.$route.params.id
      if (!epId) {
        this.videoSrc = ''
        return
      }
      try {
        const res = await $http.get(`/episodes/${epId}`)
        if (res && res.videoUrl) {
          this.videoSrc = this.baseUrl + res.videoUrl
          this.setupVideoPlayer()
        } else {
          this.videoSrc = ''
          console.error('Episode video URL not found')
        }
      } catch (error) {
        this.videoSrc = ''
        console.error('Error fetching episode details:', error.message)
      }
    },

    setupVideoPlayer() {
      const video = this.$refs.videoPlayer
      this.isHls = this.videoSrc.endsWith('.m3u8')

      if (this.hls) {
        this.hls.destroy()
        this.hls = null
      }

      if (this.isHls) {
        if (Hls.isSupported()) {
          this.hls = new Hls()
          this.hls.loadSource(this.videoSrc)
          this.hls.attachMedia(video)
          this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play()
            this.isPlaying = true
          })
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = this.videoSrc
          video.addEventListener('loadedmetadata', () => {
            video.play()
            this.isPlaying = true
          })
        }
      } else {
        video.src = this.videoSrc
      }
    },

    async nextEpisode() {
      const currentEp = parseInt(this.$route.params.id)
      const movieSlug = this.$route.params.slug
      if (!movieSlug) {
        alert('Movie slug not found')
        return
      }
      try {
        const res = await $http.get(`/episodes/movie/slug/${movieSlug}`)
        if (!Array.isArray(res)) {
          alert('Invalid episodes data')
          return
        }
        const totalEpisodes = res.length
        const nextEp = currentEp + 1
        if (nextEp > totalEpisodes) {
          alert('Phim Này Đã Hết Tập Để PLay')
          return
        }
        this.$router.push({ name: 'movie-play', params: { slug: movieSlug, id: `${nextEp}` } })
      } catch (error) {
        alert('Error fetching episodes list')
        console.error(error)
      }
    },
  },
  beforeUnmount() {
    if (this.hls) {
      this.hls.destroy()
    }
  },
}
</script>
<style scoped>
.video-container {
  max-width: 1200px;
  margin: auto;
  text-align: center;
  background-color: #222;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
}

.video {
  width: 100%;
  border-radius: 10px;
  background-color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
button {
  padding: 10px 15px;
  border-radius: 5px;
}

.extra-controls {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.extra-controls .btn {
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
}

.btn-no-ads {
  background-color: #28a745;
  color: white;
  border: none;
}

.btn-download {
  background-color: #007bff;
  color: white;
  border: none;
}

.btn-next-episode {
  background-color: #ffc107;
  color: black;
  border: none;
}

.comments-section {
  margin-top: 25px;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  background-color: #333;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.comments-section h3 {
  margin-bottom: 10px;
  font-weight: 700;
}

.comments-section p {
  color: #6c757d;
  font-style: italic;
}
</style>
