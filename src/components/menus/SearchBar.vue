<template>
  <div style="position: relative">
    <MovieSearchForm
      @input-search="performSearch"
      @submit-search="handleSearchSubmit"
      @clear-search="clearSearchResults"
    />
    <MovieSearchDropdown
      :results="searchResults"
      :loading="loadingSearchResults"
      :show="showSearchResults"
      @select="goToMovieDetail"
    />
  </div>
</template>

<script>
import MovieSearchForm from '@/components/movies/MovieSearchForm.vue'
import MovieSearchDropdown from '@/components/movies/MovieSearchDropdown.vue'
import { $http } from '@/plugins/http-wrapper'

export default {
  components: {
    MovieSearchForm,
    MovieSearchDropdown,
  },
  data() {
    return {
      searchResults: [],
      loadingSearchResults: false,
      showSearchResults: false,
    }
  },
  methods: {
    async performSearch(searchText) {
      if (searchText.trim() === '') {
        this.searchResults = []
        this.showSearchResults = false
        return
      }
      this.loadingSearchResults = true
      try {
        const params = {
          page: 0,
          size: 5,
          sortBy: 'title',
          sortOrder: 'asc',
          search: searchText.trim(),
        }
        const response = await $http.get('/movies/search', params)
        if (response && response.content) {
          this.searchResults = response.content
          this.showSearchResults = true
        } else {
          this.searchResults = []
          this.showSearchResults = false
        }
      } catch (error) {
        console.error('Search failed:', error)
        this.searchResults = []
        this.showSearchResults = false
      } finally {
        this.loadingSearchResults = false
      }
    },
    handleSearchSubmit(searchText) {
      this.performSearch(searchText)
      this.$router.push({ path: '/movies', query: { search: searchText.trim() } })
    },
    clearSearchResults() {
      this.searchResults = []
      this.showSearchResults = false
    },
    goToMovieDetail(slug) {
      this.performSearch(slug)
      this.$router.push({ path: `/movie/${slug}` })
    },
  },
}
</script>
