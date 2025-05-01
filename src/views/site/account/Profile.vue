<template>
  <div class="profile-container" style="margin-top: 30px">
    <div class="profile-header">
      <h2>Thông Tin Tài Khoản</h2>
    </div>

    <div class="profile-content">
      <div class="avatar-section">
        <div class="avatar-wrapper">
          <img :src="avatarPreview || getImage(user.avatar)" alt="User Avatar" class="avatar" />
          <button class="btn btn-sm btn-outline-secondary mt-2" @click="triggerFileInput">
            Change Avatar
          </button>
          <input
            type="file"
            ref="fileInput"
            @change="handleFileChange"
            accept="image/*"
            style="display: none"
          />
          <div v-if="avatarPreview" class="mt-2">
            <button class="btn btn-sm btn-primary" @click="changeAvatar">Upload Avatar</button>
            <button class="btn btn-sm btn-secondary ms-2" @click="cancelAvatarChange">
              Cancel
            </button>
          </div>
          <p class="mt-4 text-warning">Tham Gia Vào</p>
          <p class="text-warning">{{ createdDay }}</p>
        </div>
      </div>

      <div class="info-section">
        <div class="info-item">
          <label>Họ và tên:</label>
          <input
            v-model="user.name"
            type="text"
            class="form-control"
            placeholder="Nhập họ và tên"
            required
          />
        </div>

        <div class="info-item">
          <label>Email:</label>
          <div class="info-value">{{ user.email }}</div>
        </div>

        <div class="info-item">
          <label>Số dư:</label>
          <div class="info-value">{{ formatBalance(user.balance) }}</div>
        </div>

        <div class="info-item">
          <label>Mật khẩu:</label>
          <div class="info-value">********</div>
          <button class="btn btn-sm btn-outline-primary" @click="changePassword">
            Đổi mật khẩu
          </button>
        </div>

        <div class="actions mt-4">
          <button class="btn btn-primary" @click="updateName">Cập nhật thông tin</button>
        </div>
      </div>
    </div>
    <div v-if="showPasswordModal" class="modal-overlay">
      <div class="modal-content">
        <h4>Đổi mật khẩu</h4>
        <div class="form-group">
          <label>Mật khẩu hiện tại</label>
          <input v-model="passwordForm.current" type="password" class="form-control" />
        </div>
        <div class="form-group">
          <label>Mật khẩu mới</label>
          <input v-model="passwordForm.new" type="password" class="form-control" />
        </div>
        <div class="form-group">
          <label>Xác nhận mật khẩu</label>
          <input v-model="passwordForm.confirm" type="password" class="form-control" />
        </div>
        <div class="modal-actions">
          <button class="btn btn-primary" @click="updatePassword">Xác nhận</button>
          <button class="btn btn-outline-secondary" @click="showPasswordModal = false">Hủy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { $http } from '@/plugins/http-wrapper'

export default {
  name: 'ProfileView',
  data() {
    return {
      user: {},
      userID: null,
      avatarFile: null,
      avatarPreview: null,
    }
  },
  computed: {
    createdDay() {
      if (!this.user.createdAt) return ''
      const date = new Date(this.user.createdAt)
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      return `${day}/${month}/${year}`
    },
  },
  mounted() {
    this.fetchUserInfor()
  },

  methods: {
    getImage(imageName) {
      return `http://localhost:8080${imageName}`
    },
    async fetchUserInfor() {
      try {
        const res = await $http.get('/auth/userinfo')
        if (res) {
          this.user = res
          this.userID = res.userID
          return res.userID
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
      return null
    },
    formatBalance(value) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(value)
    },

    changePassword() {
      alert('Change password functionality would go here')
    },

    triggerFileInput() {
      this.$refs.fileInput.click()
    },

    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        this.avatarFile = file
        if (this.avatarPreview) {
          URL.revokeObjectURL(this.avatarPreview)
        }
        this.avatarPreview = URL.createObjectURL(file)
      }
    },

    async cancelAvatarChange() {
      if (this.avatarPreview) {
        URL.revokeObjectURL(this.avatarPreview)
      }
      this.avatarPreview = null
      this.avatarFile = null
      this.$refs.fileInput.value = null
    },

    async changeAvatar() {
      try {
        if (!this.userID) {
          await this.fetchUserInfor()
          if (!this.userID) {
            throw new Error('Unable to get user ID')
          }
        }
        this.errors = {}
        const userDTO = {
          name: this.user.name,
          mobileNumber: this.user.mobileNumber,
          email: this.user.email,
          balance: Number(this.user.balance),
          password: this.user.password || undefined,
        }

        const formData = new FormData()
        formData.append(
          'userDTO',
          new Blob([JSON.stringify(userDTO)], {
            type: 'application/json',
          })
        )
        if (this.avatarFile) {
          formData.append('imageFile', this.avatarFile)
        }
        const response = await $http.put(`/users/update/${this.userID}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        if (response) {
          this.user = response
          alert('Cập Nhật Thông Tin Thành Công')
          window.location.reload()
        }
      } catch (error) {
        console.log('Error response data:', error.response ? error.response.data : error)
      }
    },

    async updateName() {
      if (!this.user.name || this.user.name.trim() === '') {
        alert('Tên không được để trống')
        return
      }
      await this.changeAvatar()
    },
  },
}
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.profile-header h2 {
  color: #333;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.profile-content {
  display: flex;
  flex-direction: row;
  gap: 40px;
}

.avatar-section {
  flex: 0 0 200px;
}

.avatar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f0f0f0;
}

.info-section {
  flex: 1;
}

.info-item {
  margin-bottom: 20px;
}

.info-item label {
  display: block;
  font-weight: 600;
  color: #555;
  margin-bottom: 5px;
}

.info-value {
  padding: 8px 12px;
  background-color: #f9f9f9;
  border-radius: 4px;
  border: 1px solid #eee;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .profile-content {
    flex-direction: column;
    gap: 20px;
  }

  .avatar-section {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
}
</style>
