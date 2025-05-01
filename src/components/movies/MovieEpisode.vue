<template>
  <div class="card text-dark mt-3 p-3">
    <h5 class="text-white">Danh sách tập</h5>
    <div class="episode-list">
      <div class="episode-item" v-for="episode in episodes" :key="episode.id">
        <button class="episode-btn season-1">
          {{ episode.episodeNumber }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    episodes: Array,
  },
}
</script>

<style>
/* episode css */
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

.episode-btn {
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

.episode-btn:hover {
  background-color: #f0f0f0;
  border-color: #888;
}

.episode-btn.season-1 {
  color: white;
  border-color: black;
  background-color: black;
}

.episode-btn.season-1:hover {
  background-color: #4bb7ed;
}
</style>
