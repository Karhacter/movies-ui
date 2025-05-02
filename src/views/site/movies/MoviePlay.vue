<template>
  <div class="video-container pt-5 mt-5">
    <video ref="videoPlayer" class="video" controls>
      <source v-if="!isHls" :src="videoSrc" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <div class="controls">
      <button @click="togglePlay" class="btn btn-primary">
        {{ isPlaying ? 'Pause' : 'Play' }}
      </button>
      <button @click="toggleFullscreen" class="btn btn-secondary">Fullscreen</button>
    </div>

    <div class="extra-controls">
      <button class="btn btn-no-ads"><i class="fa fa-ban" aria-hidden="true"></i> Ads</button>
      <button class="btn btn-download"><i class="fa fa-download"></i> Tải Phim</button>
      <button class="btn btn-next-episode"><i class="fa fa-arrow-right"></i> Tập tiếp theo</button>
    </div>

    <div class="comments-section">
      <h3>Comments</h3>
      <p>Comments will appear here.</p>
    </div>
  </div>
</template>

<script>
import Hls from 'hls.js'

export default {
  props: {
    videoSrc: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isPlaying: false,
      hls: null,
      isHls: false,
    }
  },
  mounted() {
    const video = this.$refs.videoPlayer
    this.isHls = this.videoSrc.endsWith('.m3u8')

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
    }
  },
  beforeUnmount() {
    if (this.hls) {
      this.hls.destroy()
    }
  },
  methods: {
    togglePlay() {
      const video = this.$refs.videoPlayer
      if (video.paused) {
        video.play()
        this.isPlaying = true
      } else {
        video.pause()
        this.isPlaying = false
      }
    },
    toggleFullscreen() {
      const video = this.$refs.videoPlayer
      if (video.requestFullscreen) {
        video.requestFullscreen()
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen()
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen()
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen()
      }
    },
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

.controls {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
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
