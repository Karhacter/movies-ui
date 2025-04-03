<template>
  <div class="video-container">
    <video ref="videoPlayer" class="video" controls>
      <source :src="videoSrc" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <div class="controls">
      <button @click="togglePlay" class="btn btn-primary">
        {{ isPlaying ? 'Pause' : 'Play' }}
      </button>
      <button @click="toggleFullscreen" class="btn btn-secondary">Fullscreen</button>
    </div>
  </div>
</template>

<script>
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
  max-width: 800px;
  margin: auto;
  text-align: center;
}

.video {
  width: 100%;
  border-radius: 10px;
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
</style>
