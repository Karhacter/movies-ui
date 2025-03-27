<template>
  <div class="pagination-container d-flex justify-content-center mt-4">
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 0 || loading }">
          <a
            href="#"
            class="page-link"
            :class="{ 'pointer-events-none': currentPage === 0 || loading }"
            @click.prevent="$emit('change-page', currentPage - 1)"
          >
            Previous
          </a>
        </li>
        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page - 1, disabled: loading }"
        >
          <a
            href="#"
            class="page-link"
            :class="{ 'pointer-events-none': loading }"
            @click.prevent="$emit('change-page', page - 1)"
          >
            {{ page }}
          </a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages - 1 || loading }">
          <a
            href="#"
            class="page-link"
            :class="{ 'pointer-events-none': currentPage === totalPages - 1 || loading }"
            @click.prevent="$emit('change-page', currentPage + 1)"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: number
  totalPages: number
  loading: boolean
}>()

defineEmits<{
  (e: 'change-page', page: number): void
}>()
</script>

<style scoped>
.pagination-container {
  margin-top: 2rem;
}

.pagination {
  margin-bottom: 0;
}

.page-link {
  background-color: #333;
  border-color: #444;
  color: #fff;
}

.page-link:hover {
  background-color: #444;
  border-color: #555;
  color: #fff;
}

.page-item.active .page-link {
  background-color: #e50914;
  border-color: #e50914;
  color: #fff;
}

.page-item.disabled .page-link {
  background-color: #222;
  border-color: #333;
  color: #666;
  cursor: not-allowed;
}

.pointer-events-none {
  pointer-events: none;
  cursor: not-allowed;
}
</style>
