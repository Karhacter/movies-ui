<template>
  <div
    v-if="show"
    class="search-results-dropdown"
    style="
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #222;
      border: 1px solid #444;
      max-height: 300px;
      overflow-y: auto;
      z-index: 1000;
      color: white;
      border-radius: 4px;
    "
  >
    <div v-if="loading" class="p-2 text-center">Loading...</div>
    <div v-else>
      <div v-if="results.length === 0" class="p-2 text-center">No results found</div>
      <ul class="list-unstyled mb-0">
        <li
          v-for="movie in results"
          :key="movie.slug"
          class="p-2 search-result-item d-flex align-items-center"
          style="cursor: pointer; border-bottom: 1px solid #444"
          @click="$emit('select', movie.slug)"
        >
          <img
            v-if="movie.image"
            :src="getImage(movie.image)"
            alt="movie.title"
            style="
              width: 50px;
              height: 70px;
              object-fit: cover;
              margin-right: 10px;
              border-radius: 4px;
            "
          />
          <div>
            <span>{{ movie.title }}</span>
            <p class="text-warning">{{ movie.rating }} Imdb</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieSearchDropdown',
  props: {
    results: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getImage(imageName) {
      return `${process.env.VITE_API_URL}${imageName}`
    },
  },
}
</script>

<style scoped>
.search-results-dropdown {
  max-height: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 5px 0;
  border-radius: 6px;
}
.search-result-item {
  padding: 5px 10px;
  transition: background-color 0.2s ease;
}
.search-result-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
