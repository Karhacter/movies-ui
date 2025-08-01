<template>
  <div class="content-wrapper">
    <section class="content-body">
      <div
        class="table-responsive"
        style="padding-left: 20px; padding-right: 20px; border: 1px solid #0080ff"
      >
        <h1 class="text-main text-success" style="margin-top: 10px">List Phim</h1>
        <div class="text-end mb-4">
          <router-link to="/admin/movies/create" class="btn btn-sm btn-success me-3">
            <i class="fa fa-plus"></i> Thêm Mới Movie
          </router-link>
          <router-link to="/admin/movies/trash" class="btn btn-sm btn-danger">
            <i class="fa fa-trash"></i> Thùng rác
          </router-link>
        </div>
        <div class="card-body">
          <table class="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th class="text-center" style="width: 30px">
                  <input type="checkbox" />
                </th>
                <th class="text-center" style="width: 130px">Hình ảnh</th>
                <th>Tiêu đề phim</th>
                <th>Thể loại</th>
                <th>Ngày chiếu</th>
                <th>chức năng</th>
                <th>ID</th>
              </tr>
            </thead>

            <tbody v-for="movie in movies" :key="movie.id">
              <tr class="datarow" v-if="movie.statusDelete == 1">
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
                    <router-link
                      :to="`/admin/movie/edit/${movie.id}`"
                      class="btn btn-sm btn-primary me-2"
                    >
                      <i class="fa fa-edit"></i> chỉnh sửa
                    </router-link>
                    <router-link
                      :to="`/admin/movie/detail/${movie.id}`"
                      class="btn btn-sm btn-info me-2"
                    >
                      <i class="fa fa-eye"></i> chi tiết
                    </router-link>
                    <button @click="deleteMovie(movie.id)" class="btn btn-sm btn-danger me-2">
                      <i class="fa fa-trash"></i> xóa
                    </button>
                  </div>
                </td>
                <td class="text-center" style="width: 30px">{{ movie.id }}</td>
              </tr>
            </tbody>
          </table>
          <div v-if="loading" class="text-center text-primary my-3">Loading movies...</div>
          <div class="pagination-controls" style="padding: 10px; text-align: center">
            <button
              class="btn btn-sm btn-primary me-2"
              :disabled="currentPage === 0 || loading"
              @click="goToPage(currentPage - 1)"
            >
              Previous
            </button>
            <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
            <button
              class="btn btn-sm btn-primary ms-2"
              :disabled="currentPage === totalPages - 1 || loading"
              @click="goToPage(currentPage + 1)"
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
  methods: {
    getImage(imageName) {
      if (!imageName) return ''
      return `${import.meta.env.VITE_API_URL}${imageName.startsWith('/') ? '' : '/'}${imageName}`
    },
    async fetchMovies(page = 0) {
      if (this.loading) return
      try {
        this.loading = true
        const queryParams = `?page=${page}&size=${this.pageSize}`
        console.log('Fetching movies with query:', queryParams)
        const res = await $http.get('/movies/index' + queryParams)
        console.log('Response from movies/index:', res)
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

    async deleteMovie(id) {
      try {
        // Soft delete: set statusDelete to 1
        const response = await $http.post(`/movie/soft-delete/${id}`, { statusDelete: 1 })
        if (response) {
          this.fetchMovies(this.currentPage) // Refresh movie list after delete
        }
      } catch (error) {
        console.error('Failed to soft delete movie:', error)
      }
    },
    goToPage(page) {
      if (page >= 0 && page < this.totalPages) {
        this.fetchMovies(page)
      }
    },
  },
  mounted() {
    this.fetchMovies() // Fetch movies when component is mounted
    this.fetchCategories() // Fetch categories when component is mounted
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
