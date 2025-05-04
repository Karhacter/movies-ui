<template>
  <form id="searchForm" class="d-flex me-3" @submit.prevent="handleSubmit">
    <input
      v-model="searchText"
      class="form-control me-2"
      type="text"
      placeholder="Search"
      aria-label="Search"
      @input="handleInput"
    />
    <button class="btn btn-danger" type="submit">Search</button>
  </form>
</template>

<script>
export default {
  name: 'MovieSearchForm',
  data() {
    return {
      searchText: '',
      debounceTimeout: null,
    }
  },
  methods: {
    handleSubmit() {
      if (this.searchText.trim() === '') {
        return
      }
      this.$emit('submit-search', this.searchText.trim())
    },
    handleInput() {
      clearTimeout(this.debounceTimeout)
      this.debounceTimeout = setTimeout(() => {
        if (this.searchText.trim() === '') {
          this.$emit('clear-search')
          return
        }
        this.$emit('input-search', this.searchText.trim())
      }, 300)
    },
  },
}
</script>

<style scoped>
.form-control {
  background-color: white;
  border-color: #444;
  color: white;
}

.form-control:focus {
  background-color: #333;
  border-color: #666;
  color: dark;
}

.form-control::placeholder {
  color: #888;
}
</style>
