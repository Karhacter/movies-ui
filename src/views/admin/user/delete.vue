<template>
  <div class="content-wrapper">
    <section class="content-body" style="padding-bottom: 350px">
      <div class="table-responsive" style="padding-left: 20px; padding-right: 20px">
        <h1 class="text-main text-danger" style="margin-top: 50px">Tài Khoản Đã Xóa</h1>
        <div class="text-end mb-4">
          <router-link to="/admin/user" class="btn btn-sm btn-info">
            <i class="fa fa-arrow-left"></i> Về Danh Sách
          </router-link>
        </div>
        <div class="card-body">
          <table class="table table-bordered table-hover table-striped">
            <thead style="border: 1px 1px 1px 1px solid black">
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
              <tr class="datarow" v-if="user.statusDelete == 0">
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
                  <div class="function_style">
                    <button @click="restoreMovie(user.userID)" class="btn btn-sm btn-info me-2">
                      <i class="fa-solid fa-window-restore"></i> Khôi Phục
                    </button>
                    <button @click="deleteMovie(user.userID)" class="btn btn-sm btn-danger me-2">
                      <i class="fa fa-trash"></i> Xóa Vĩnh Viễn
                    </button>
                  </div>
                </td>
                <td class="text-center" style="width: 30px">{{ user.userID }}</td>
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
  name: 'UserList',
  data() {
    return {
      users: [],
    }
  },
  methods: {
    getImage(imageName) {
      return `${process.env.VITE_API_URL}${imageName}`
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
    async restoreMovie(id) {
      try {
        const response = await $http.post(`/users/restore/${id}`, { statusDelete: 0 })
        if (response) this.fetchUser()
      } catch (e) {
        console.error('Failed', error)
      }
    },
    async deleteMovie(id) {
      try {
        const response = await $http.delete(`/users/delete/${id}`, { statusDelete: 0 })
        if (response) this.fetchUser()
      } catch (e) {
        console.error('Failed', error)
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
