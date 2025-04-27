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

            <tbody v-for="(movie, index) in movies" :key="index">
              <tr class="datarow" v-if="movie.statusDelete != 0">
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
      return `http://localhost:8080${imageName}`
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
    async deleteMovie(id) {
      try {
        // Soft delete: set statusDelete to 1
        const response = await $http.post(`/movie/soft-delete/${id}`, { statusDelete: 1 })
        if (response) {
          this.fetchMovies() // Refresh movie list after delete
        }
      } catch (error) {
        console.error('Failed to soft delete movie:', error)
      }
    },
  },
  mounted() {
    ;``
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
