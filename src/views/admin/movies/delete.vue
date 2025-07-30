<template>
  <div class="content-wrapper">
    <section class="content-body">
      <div
        class="table-responsive"
        style="padding-left: 20px; padding-right: 20px; border: 1px solid #0080ff"
      >
        <h1 class="text-main text-danger" style="margin-top: 10px">Thùng Rác Phim</h1>
        <div class="text-end mb-4">
          <router-link to="/admin/movies" class="btn btn-sm btn-info">
            <i class="fa fa-arrow-left"></i> Về Danh Sách
          </router-link>
        </div>

        <h2 class="text-center text-danger" v-if="movies.length == []">Cho Tôi Xin Rác</h2>
        <div class="card-body">
          <table class="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th class="text-center" style="width: 30px"></th>
                <th class="text-center" style="width: 130px">Hình ảnh</th>
                <th>Tiêu đề phim</th>
                <th>Thể loại</th>
                <th>Ngày chiếu</th>
                <th>chức năng</th>
                <th>ID</th>
              </tr>
            </thead>

            <tbody v-for="movie in movies" :key="movie.id">
              <tr class="datarow">
                <td>
                  <input type="checkbox" id="checkId[]" />
                </td>
                <td>
                  <img class="img-fluid" :src="getImage(movie.image)" alt="Image" />
                </td>
                <td>
                  <div class="movie-title">
                    <router-link :to="`/admin/movie/detail/${movie.id}`">{{
                      movie.title
                    }}</router-link>
                  </div>
                </td>
                <td>
                  <div class="cate-name">
                    <span v-for="(category, index) in movie.categories" :key="category.id">
                      {{ category.name }}<span v-if="index < movie.categories.length - 1">, </span>
                    </span>
                  </div>
                </td>
                <td>
                  <div class="movie-date">
                    {{ movie.releaseDate }}
                  </div>
                </td>
                <td>
                  <div class="function_style">
                    <button @click="restoreMovie(movie.id)" class="btn btn-sm btn-info me-2">
                      <i class="fa-solid fa-window-restore"></i> Khôi Phục
                    </button>
                    <button @click="deleteMovie(movie.id)" class="btn btn-sm btn-danger me-2">
                      <i class="fa fa-trash"></i> Xóa Vĩnh Viễn
                    </button>
                  </div>
                </td>
                <td class="text-center" style="width: 30px">{{ movie.id }}</td>
              </tr>
            </tbody>
          </table>
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
      movies: [],
      categories: [],
      currentPage: 0,
      pageSize: 10,
      totalPages: 0,
      loading: false,
      sortBy: 'rating',
      sortOrder: 'desc',
      searchQuery: '',
    }
  },
  async mounted() {
    this.fetchMovies()
    this.fetchCategories()
  },
  methods: {
    getImage(imageName) {
      if (!imageName) return ''
      return `${process.env.VITE_API_URL}${imageName.startsWith('/') ? '' : '/'}${imageName}`
    },

    async fetchMovies(page = 0) {
      if (this.loading) return
      try {
        this.loading = true
        const queryParams = `?page=${page}&size=${this.pageSize}`
        console.log('Fetching movies with query:', queryParams)
        const res = await $http.get('/movies/trash' + queryParams)
        if (res && res.content) {
          this.movies = res.content
          this.totalPages = res.totalPages
          this.currentPage = page
        } else {
          console.error('Unexpected response structure:', res)
        }
      } catch (e) {
        console.error('Error fetching movies:', e)
      } finally {
        this.loading = false
      }
    },
    async fetchCategories() {
      try {
        const res = await $http.get('/categories/index')
        if (res) {
          this.categories = res
        }
      } catch (e) {
        console.error('Error fetching categories:', e.message)
      }
    },
    editMovie(id) {
      // Placeholder for edit functionality
    },
    async restoreMovie(id) {
      try {
        const response = await $http.post(`/movie/restore/${id}`, { statusDelete: 0 })
        if (response) this.fetchMovies()
      } catch (e) {
        console.error('Failed', error)
      }
    },
    async deleteMovie(id) {
      try {
        const response = await $http.delete(`/movie/delete/${id}`, { statusDelete: 0 })
        if (response) this.fetchMovies()
      } catch (e) {
        console.error('Failed', error)
      }
    },
    goToPage(page) {
      if (page >= 0 && page < this.totalPages) {
        this.fetchMovies(page)
      }
    },
  },
}
</script>

<style scoped>
@import '@/assets/css/adminlte.css';
.movie-title {
  width: 300px;
}
.cate-name {
  width: 100px;
}

.function_style,
.movie-date {
  margin: auto;
  padding: 20px;
}
</style>
