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
              <tr class="datarow" v-if="movie.statusDelete === 0">
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
                    {{ movie.category.name }}
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
      movies: [], // Placeholder for movie data
      categories: [], // Placeholder for category data
    }
  },
  methods: {
    getImage(imageName) {
      return new URL(`../../../assets/img/movies/${imageName}`, import.meta.url).href
    },
    async fetchMovies() {
      try {
        const res = await $http.get('/movies/get-all')
        if (res) {
          this.movies = res
          console.log(res)
        }
      } catch (e) {
        console.error('Error fetching movies:', e.message)
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
