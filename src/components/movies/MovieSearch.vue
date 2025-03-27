<template>
  <div class="d-flex justify-content-between align-items-center p-3">
    <h5 class="section-title" style="color: #ffc107; text-decoration: none">DANH SÁCH PHIM BỘ</h5>
    <div class="d-flex gap-2">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="Search movies..."
        @input="$emit('search', searchQuery)"
      />
      <select v-model="sortBy" class="form-select" @change="$emit('sort', sortBy)">
        <option value="rating">Sort by Rating</option>
        <option value="title">Sort by Title</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')
const sortBy = ref('rating')

defineEmits<{
  (e: 'search', query: string): void
  (e: 'sort', sortBy: string): void
}>()
</script>

<style scoped>
.form-control,
.form-select {
  background-color: #333;
  border-color: #444;
  color: white;
}

.form-control:focus,
.form-select:focus {
  background-color: #333;
  border-color: #666;
  color: white;
}

.form-control::placeholder {
  color: #888;
}
</style>
