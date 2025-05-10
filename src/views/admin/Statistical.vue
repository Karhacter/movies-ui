<template>
  <div class="content">
    <div class="container-fluid">
      <div class="cards-grid">
        <div class="card mb-4">
          <div class="card-header">
            <h3>Overall Statistics</h3>
          </div>
          <div class="card-body">
            <div v-if="overallStats">
              <p>Total Movies: {{ overallStats.totalMovies }}</p>
              <p>Average Rating: {{ overallStats.averageRating.toFixed(2) }}</p>
              <p>Total Views: {{ overallStats.totalViews }}</p>
              <p>Total Comments: {{ overallStats.totalComments }}</p>
            </div>
            <div v-else>Loading overall statistics...</div>
          </div>
        </div>

        <div class="card mb-4">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h3>Statistics by Time Period</h3>
            <select
              v-model="selectedPeriod"
              @change="fetchStatsByPeriod"
              class="form-control w-auto"
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>
          <div class="card-body">
            <div v-if="periodStats">
              <p>Total Movies: {{ periodStats.totalMovies }}</p>
              <p>Average Rating: {{ periodStats.averageRating.toFixed(2) }}</p>
              <p>Total Views: {{ periodStats.totalViews }}</p>
              <p>Total Comments: {{ periodStats.totalComments }}</p>
            </div>
            <div v-else>Loading statistics for {{ selectedPeriod }}...</div>
          </div>
        </div>

        <div class="card" v-for="(list, index) in movieLists" :key="index">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h3>{{ list.title }}</h3>
            <input
              type="number"
              min="1"
              max="50"
              v-model.number="list.limit"
              @change="fetchMovieList(index)"
              class="form-control w-auto"
            />
          </div>
          <div class="card-body">
            <table class="table table-striped" v-if="list.movies && list.movies.length">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Rating</th>
                  <th>Views</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="movie in list.movies" :key="movie.id">
                  <td>{{ movie.title }}</td>
                  <td>{{ movie.rating }}</td>
                  <td>{{ movie.views }}</td>
                  <td>
                    <span v-if="movie.comments && movie.comments.length">
                      <span v-for="(comment, idx) in movie.comments" :key="comment.id">
                        {{ comment.content }}<span v-if="idx < movie.comments.length - 1">, </span>
                      </span>
                    </span>
                    <span v-else>No comments</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else>No movies found.</div>
          </div>
        </div>

        <!-- New card for Movies by Rating Range -->
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h3>Movies by Rating Range</h3>
            <div class="d-flex gap-2 align-items-center">
              <label for="minRating" class="mb-0">Min Rating:</label>
              <input
                id="minRating"
                type="number"
                min="0"
                max="10"
                step="0.1"
                v-model.number="minRating"
                class="form-control"
                style="width: 100px"
              />
              <label for="maxRating" class="mb-0">Max Rating:</label>
              <input
                id="maxRating"
                type="number"
                min="0"
                max="10"
                step="0.1"
                v-model.number="maxRating"
                class="form-control"
                style="width: 100px"
              />
              <button class="btn btn-primary" @click="fetchMoviesByRatingRange">Filter</button>
            </div>
          </div>
          <div class="card-body">
            <table class="table table-striped" v-if="ratingRangeMovies && ratingRangeMovies.length">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Rating</th>
                  <th>Views</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="movie in ratingRangeMovies" :key="movie.id">
                  <td>{{ movie.title }}</td>
                  <td>{{ movie.rating }}</td>
                  <td>{{ movie.views }}</td>
                  <td>
                    <span v-if="movie.comments && movie.comments.length">
                      <span v-for="(comment, idx) in movie.comments" :key="comment.id">
                        {{ comment.content }}<span v-if="idx < movie.comments.length - 1">, </span>
                      </span>
                    </span>
                    <span v-else>No comments</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else>No movies found in this rating range.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import {
  getOverallStats,
  getStatsByTimePeriod,
  getTopRatedMovies,
  getMostViewedMovies,
  getMostCommentedMovies,
  getMoviesByRatingRange,
} from '@/services/statisticalService'

export default defineComponent({
  name: 'StatisticalNew',
  setup() {
    const overallStats = ref<any>(null)
    const periodStats = ref<any>(null)
    const selectedPeriod = ref('daily')

    const movieLists = ref([
      { title: 'Top Rated Movies', limit: 3, movies: [] as any[], fetchFunc: getTopRatedMovies },
      {
        title: 'Most Viewed Movies',
        limit: 3,
        movies: [] as any[],
        fetchFunc: getMostViewedMovies,
      },
      {
        title: 'Most Commented Movies',
        limit: 3,
        movies: [] as any[],
        fetchFunc: getMostCommentedMovies,
      },
    ])

    const minRating = ref(7)
    const maxRating = ref(8)
    const ratingRangeMovies = ref<any[]>([])

    const fetchOverallStats = async () => {
      try {
        const response = await getOverallStats()
        overallStats.value = response
      } catch (error) {
        console.error('Failed to fetch overall stats', error)
      }
    }

    const fetchStatsByPeriod = async () => {
      try {
        const response = await getStatsByTimePeriod(selectedPeriod.value)
        periodStats.value = response
      } catch (error) {
        console.error('Failed to fetch stats by period', error)
      }
    }

    const fetchMovieList = async (index: number) => {
      try {
        const list = movieLists.value[index]
        const response = await list.fetchFunc(list.limit)
        list.movies = response
      } catch (error) {
        console.error(`Failed to fetch ${movieLists.value[index].title}`, error)
      }
    }

    const fetchMoviesByRatingRange = async () => {
      try {
        const response = await getMoviesByRatingRange(minRating.value, maxRating.value)
        ratingRangeMovies.value = response
      } catch (error) {
        console.error('Failed to fetch movies by rating range', error)
      }
    }

    onMounted(() => {
      fetchOverallStats()
      fetchStatsByPeriod()
      movieLists.value.forEach((_, index) => fetchMovieList(index))
    })

    return {
      overallStats,
      periodStats,
      selectedPeriod,
      movieLists,
      minRating,
      maxRating,
      ratingRangeMovies,
      fetchStatsByPeriod,
      fetchMovieList,
      fetchMoviesByRatingRange,
    }
  },
})
</script>

<style scoped>
@import '@/assets/css/adminlte.css';
.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.card {
  margin-bottom: 0 !important;
}
</style>
