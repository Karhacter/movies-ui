<template>
  <div class="content-wrapper" style="background-color: #ffffff">
    <section class="content-body" style="padding-bottom: 200px">
      <div class="table-responsive" style="padding-left: 20px; padding-right: 20px">
        <h1 class="text-main text-info" style="margin-top: 50px">Danh Sách Tài Khoản</h1>

        <div class="text-end mb-4">
          <router-link to="/admin/user/create" class="btn btn-sm btn-success me-2">
            <i class="fa fa-plus"></i> Tạo Tài Khoản Mới
          </router-link>
          <router-link to="/admin/user/trash" class="btn btn-sm btn-danger">
            <i class="fa fa-trash"></i> Thùng rác
          </router-link>
        </div>

        <table class="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th class="text-center" style="width: 30px"></th>
              <th class="text-center" style="width: 130px">Hình ảnh</th>
              <th>Tên</th>
              <th>Số Dư</th>
              <th>Số Điện Thoại</th>
              <th>chức năng</th>
              <th>ID</th>
            </tr>
          </thead>

          <tbody v-for="user in users" :key="user.userID">
            <tr class="datarow" v-if="user.statusDelete != 0">
              <td>
                <input type="checkbox" id="checkId[]" />
              </td>
              <td>
                <img class="img-fluid" :src="getImage(user.avatar)" alt="Image" />
              </td>
              <td>
                <div class="movie-title">
                  <a href="">{{ user.name }}</a>
                </div>
              </td>
              <td>
                <div class="cate-name">
                  {{ user.balance }}
                </div>
              </td>
              <td>
                <div class="movie-date">
                  {{ user.mobileNumber }}
                </div>
              </td>
              <td>
                <div class="function_style text-center">
                  <router-link
                    :to="`/admin/user/edit/${user.userID}`"
                    class="btn btn-sm btn-primary me-2"
                  >
                    <i class="fa fa-edit"></i> chỉnh sửa
                  </router-link>
                  <router-link
                    :to="`/admin/user/detail/${user.userID}`"
                    class="btn btn-sm btn-info me-2"
                  >
                    <i class="fa fa-eye"></i> chi tiết
                  </router-link>
                  <button @click="deleteMovie(user.userID)" class="btn btn-sm btn-danger me-2">
                    <i class="fa fa-trash"></i> xóa
                  </button>
                </div>
              </td>
              <td class="text-center" style="width: 30px">{{ user.userID }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import { $http } from '@/plugins/http-wrapper'

export default {
  name: 'UserList',
  data() {
    return {
      users: [],
    }
  },
  methods: {
    getImage(imageName) {
      return `http://localhost:8080${imageName}`
    },
    async fetchUser() {
      try {
        const res = await $http.get('/users/index')
        if (res) {
          this.users = res
        }
      } catch (e) {
        console.error('Error fetching users:', e.message)
      }
    },
    async deleteMovie(id) {
      try {
        // Soft delete: set statusDelete to 1
        const response = await $http.post(`/users/soft-delete/${id}`, { statusDelete: 1 })
        if (response) {
          this.fetchUser() // Refresh movie list after delete
        }
      } catch (error) {
        console.error('Failed to soft delete user:', error)
      }
    },
  },
  mounted() {
    this.fetchUser()
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
