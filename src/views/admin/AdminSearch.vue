<template>
  <div class="content-wrapper pb-5 text-dark">
    <section class="content-body pb-5" style="padding: 20px">
      <div class="admin-search text-dark">
        <h2>Admin Search</h2>
        <div>
          <label for="entity-select">Select Entity:</label>
          <select id="entity-select" v-model="selectedEntity" @change="resetSearch">
            <option value="movies">Movies</option>
            <option value="users">Users</option>
            <option value="reviews">Reviews</option>
            <option value="ads">Ads</option>
            <option value="payments">Payments</option>
          </select>
        </div>

        <div v-if="selectedEntity === 'movies'">
          <h3>Search Movies</h3>
          <form @submit.prevent="searchMovies">
            <input v-model="movieSearch.title" placeholder="Title" required />
            <input v-model="movieSearch.genre" placeholder="Genre" />
            <input v-model="movieSearch.releaseDate" placeholder="Release Date (YYYY-MM-DD)" />
            <div>
              <label>Sort By:</label>
              <select v-model="movieSearch.sortBy">
                <option value="title">Title</option>
                <option value="releaseDate">Release Date</option>
              </select>
              <select v-model="movieSearch.sortOrder">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <button type="submit">Search</button>
          </form>
          <div v-if="loading">Loading...</div>
          <div v-if="error" class="error">{{ error }}</div>
          <div v-if="movieResults">
            <h4>Results (Page {{ movieResults.number + 1 }} of {{ movieResults.totalPages }})</h4>
            <table class="text-dark">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Release Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="movie in movieResults.content" :key="movie.id">
                  <td>{{ movie.title }}</td>
                  <td>
                    {{ movie.categories ? movie.categories.map((c) => c.name).join(', ') : '' }}
                  </td>
                  <td>{{ movie.releaseDate }}</td>
                </tr>
              </tbody>
            </table>
            <button
              :disabled="movieResults.number === 0"
              @click="changeMoviePage(movieResults.number - 1)"
            >
              Previous
            </button>
            <button
              :disabled="movieResults.number + 1 >= movieResults.totalPages"
              @click="changeMoviePage(movieResults.number + 1)"
            >
              Next
            </button>
          </div>
        </div>

        <div v-if="selectedEntity === 'users'">
          <h3>Search Users</h3>
          <form @submit.prevent="searchUsers">
            <input v-model="userSearch.name" placeholder="Name" required />
            <input v-model="userSearch.email" placeholder="Email" />
            <input v-model="userSearch.role" placeholder="Role" />
            <div>
              <label>Sort By:</label>
              <select v-model="userSearch.sortBy">
                <option value="name">Name</option>
                <option value="email">Email</option>
              </select>
              <select v-model="userSearch.sortOrder">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <button type="submit">Search</button>
          </form>
          <div v-if="loading">Loading...</div>
          <div v-if="error" class="error">{{ error }}</div>
          <div v-if="userResults">
            <h4>Results (Page {{ userResults.number + 1 }} of {{ userResults.totalPages }})</h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in userResults.content" :key="user.id">
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.role }}</td>
                </tr>
              </tbody>
            </table>
            <button
              :disabled="userResults.number === 0"
              @click="changeUserPage(userResults.number - 1)"
            >
              Previous
            </button>
            <button
              :disabled="userResults.number + 1 >= userResults.totalPages"
              @click="changeUserPage(userResults.number + 1)"
            >
              Next
            </button>
          </div>
        </div>

        <div v-if="selectedEntity === 'reviews'">
          <h3>Search Reviews</h3>
          <form @submit.prevent="searchReviews">
            <input v-model="reviewSearch.content" placeholder="Content" />
            <input v-model="reviewSearch.username" placeholder="Username" />
            <input v-model="reviewSearch.movieTitle" placeholder="Movie Title" />
            <input v-model="reviewSearch.reviewDate" placeholder="Review Date (YYYY-MM-DD)" />
            <input
              type="number"
              v-model.number="reviewSearch.rating"
              placeholder="Rating"
              min="1"
              max="5"
            />
            <button type="submit">Search</button>
          </form>
          <div v-if="loading">Loading...</div>
          <div v-if="error" class="error">{{ error }}</div>
          <div v-if="reviewResults && reviewResults.length">
            <h4>Results</h4>
            <table>
              <thead>
                <tr>
                  <th>Content</th>
                  <th>Username</th>
                  <th>Movie Title</th>
                  <th>Review Date</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="review in reviewResults" :key="review.id">
                  <td>{{ review.content }}</td>
                  <td>{{ review.username }}</td>
                  <td>{{ review.movieTitle }}</td>
                  <td>{{ review.reviewDate }}</td>
                  <td>{{ review.rating }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="selectedEntity === 'ads'">
          <h3>Search Ads</h3>
          <form @submit.prevent="searchAds">
            <input v-model="adSearch.adName" placeholder="Ad Name" />
            <input v-model="adSearch.campaignOwner" placeholder="Campaign Owner" />
            <input v-model="adSearch.duration" placeholder="Duration" />
            <input v-model="adSearch.status" placeholder="Status" />
            <button type="submit">Search</button>
          </form>
          <div v-if="loading">Loading...</div>
          <div v-if="error" class="error">{{ error }}</div>
          <div v-if="adResults && adResults.length">
            <h4>Results</h4>
            <table>
              <thead>
                <tr>
                  <th>Ad Name</th>
                  <th>Campaign Owner</th>
                  <th>Duration</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ad in adResults" :key="ad.id">
                  <td>{{ ad.adName }}</td>
                  <td>{{ ad.campaignOwner }}</td>
                  <td>{{ ad.duration }}</td>
                  <td>{{ ad.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="selectedEntity === 'payments'">
          <h3>Search Payments</h3>
          <form @submit.prevent="searchPayments">
            <input v-model="paymentSearch.transactionId" placeholder="Transaction ID" />
            <input v-model="paymentSearch.user" placeholder="User" />
            <input
              type="number"
              v-model.number="paymentSearch.amount"
              placeholder="Amount"
              step="0.01"
            />
            <input v-model="paymentSearch.date" placeholder="Date (YYYY-MM-DD)" />
            <input v-model="paymentSearch.status" placeholder="Status" />
            <div>
              <label>Sort By:</label>
              <select v-model="paymentSearch.sortBy">
                <option value="id">ID</option>
                <option value="amount">Amount</option>
                <option value="date">Date</option>
              </select>
              <select v-model="paymentSearch.sortOrder">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <button type="submit">Search</button>
          </form>
          <div v-if="loading">Loading...</div>
          <div v-if="error" class="error">{{ error }}</div>
          <div v-if="paymentResults">
            <h4>
              Results (Page {{ paymentResults.number + 1 }} of {{ paymentResults.totalPages }})
            </h4>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="payment in paymentResults.content" :key="payment.id">
                  <td>{{ payment.id }}</td>
                  <td>{{ payment.user }}</td>
                  <td>{{ payment.amount }}</td>
                  <td>{{ payment.date }}</td>
                  <td>{{ payment.status }}</td>
                </tr>
              </tbody>
            </table>
            <button
              :disabled="paymentResults.number === 0"
              @click="changePaymentPage(paymentResults.number - 1)"
            >
              Previous
            </button>
            <button
              :disabled="paymentResults.number + 1 >= paymentResults.totalPages"
              @click="changePaymentPage(paymentResults.number + 1)"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { $http } from '@/plugins/http-wrapper'
export default {
  data() {
    return {
      selectedEntity: 'movies',
      loading: false,
      error: null,
      // Movies search
      movieSearch: {
        title: '',
        genre: '',
        releaseDate: '',
        page: 0,
        size: 10,
        sortBy: 'title',
        sortOrder: 'asc',
      },
      movieResults: null,
      // Users search
      userSearch: {
        name: '',
        email: '',
        role: '',
        page: 0,
        size: 10,
        sortBy: 'name',
        sortOrder: 'asc',
      },
      userResults: null,
      // Reviews search
      reviewSearch: {
        content: '',
        username: '',
        movieTitle: '',
        reviewDate: '',
        rating: null,
      },
      reviewResults: null,
      // Ads search
      adSearch: {
        adName: '',
        campaignOwner: '',
        duration: '',
        status: '',
      },
      adResults: null,
      // Payments search
      paymentSearch: {
        transactionId: '',
        user: '',
        amount: null,
        date: '',
        status: '',
        page: 0,
        size: 10,
        sortBy: 'id',
        sortOrder: 'asc',
      },
      paymentResults: null,
    }
  },
  mounted() {
    this.searchMovies()
  },
  methods: {
    resetSearch() {
      this.error = null
      this.loading = false
      // Reset results and search params when switching entity
      this.movieResults = null
      this.userResults = null
      this.reviewResults = null
      this.adResults = null
      this.paymentResults = null
    },
    async searchMovies() {
      this.loading = true
      this.error = null
      try {
        const params = {
          title: this.movieSearch.title,
          genre: this.movieSearch.genre || undefined,
          releaseDate: this.movieSearch.releaseDate || undefined,
          page: this.movieSearch.page,
          size: this.movieSearch.size,
          sortBy: this.movieSearch.sortBy,
          sortOrder: this.movieSearch.sortOrder,
        }
        const response = await $http.get('/admin/movies/search', params)
        this.movieResults = response
        console.log('Movie search response:', response)
      } catch (err) {
        this.error = 'Failed to fetch movies.'
      } finally {
        this.loading = false
      }
    },
    changeMoviePage(newPage) {
      this.movieSearch.page = newPage
      this.searchMovies()
    },
    async searchUsers() {
      this.loading = true
      this.error = null
      try {
        const params = {
          name: this.userSearch.name,
          email: this.userSearch.email || undefined,
          role: this.userSearch.role || undefined,
          page: this.userSearch.page,
          size: this.userSearch.size,
          sortBy: this.userSearch.sortBy,
          sortOrder: this.userSearch.sortOrder,
        }
        const response = await $http.get('/admin/users/search', params)
        this.userResults = response
      } catch (err) {
        this.error = 'Failed to fetch users.'
      } finally {
        this.loading = false
      }
    },
    changeUserPage(newPage) {
      this.userSearch.page = newPage
      this.searchUsers()
    },
    async searchReviews() {
      this.loading = true
      this.error = null
      try {
        const params = {
          content: this.reviewSearch.content || undefined,
          username: this.reviewSearch.username || undefined,
          movieTitle: this.reviewSearch.movieTitle || undefined,
          reviewDate: this.reviewSearch.reviewDate || undefined,
          rating: this.reviewSearch.rating || undefined,
        }
        const response = await $http.get('/admin/reviews/search', params)
        this.reviewResults = response
      } catch (err) {
        this.error = 'Failed to fetch reviews.'
      } finally {
        this.loading = false
      }
    },
    async searchAds() {
      this.loading = true
      this.error = null
      try {
        const params = {
          adName: this.adSearch.adName || undefined,
          campaignOwner: this.adSearch.campaignOwner || undefined,
          duration: this.adSearch.duration || undefined,
          status: this.adSearch.status || undefined,
        }
        const response = await $http.get('/admin/ads/search', params)
        this.adResults = response
      } catch (err) {
        this.error = 'Failed to fetch ads.'
      } finally {
        this.loading = false
      }
    },
    async searchPayments() {
      this.loading = true
      this.error = null
      try {
        const params = {
          transactionId: this.paymentSearch.transactionId || undefined,
          user: this.paymentSearch.user || undefined,
          amount: this.paymentSearch.amount || undefined,
          date: this.paymentSearch.date || undefined,
          status: this.paymentSearch.status || undefined,
          page: this.paymentSearch.page,
          size: this.paymentSearch.size,
          sortBy: this.paymentSearch.sortBy,
          sortOrder: this.paymentSearch.sortOrder,
        }
        const response = await $http.get('/admin/payments/search', params)
        this.paymentResults = response
      } catch (err) {
        this.error = 'Failed to fetch payments.'
      } finally {
        this.loading = false
      }
    },
    changePaymentPage(newPage) {
      this.paymentSearch.page = newPage
      this.searchPayments()
    },
  },
}
</script>

<style scoped>
@import '@/assets/css/adminlte.css';
.admin-search {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
}
form {
  margin-bottom: 1rem;
}
input,
select {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}
.error {
  color: red;
  margin-top: 0.5rem;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
}
th,
td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}
button {
  margin-right: 0.5rem;
}
</style>
