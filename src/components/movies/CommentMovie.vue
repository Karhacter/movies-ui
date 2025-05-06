<template>
  <div class="card text-dark mt-4 p-3">
    <h3>Bình luận</h3>
    <!-- New comment input -->
    <div v-if="userID" class="mb-3 mt-2">
      <textarea
        v-model="newCommentContent"
        class="form-control"
        rows="3"
        placeholder="Viết bình luận của bạn..."
      ></textarea>
      <button
        class="btn btn-primary mt-2"
        @click="submitComment"
        :disabled="!newCommentContent.trim()"
      >
        Gửi bình luận
      </button>
    </div>
    <div v-else class="login-before-comment">
      <button class="btn btn-warning mb-3" @click="redirectToLogin">Đăng Nhập Để Bình Luận</button>
    </div>
    <div v-for="(comment, index) in comments" :key="index" class="mb-3 mt-2 border p-2">
      <div class="d-flex align-items-start">
        <!-- Avatar Image -->
        <img
          :src="getImage(comment.userAvatar)"
          alt="Avatar"
          class="img-fluid comment-avatar me-2 mt-2"
        />

        <!-- Comment Content -->
        <div class="comment-content">
          <p class="fs-5">{{ comment.userName }}</p>
          <p>{{ comment.content }}</p>
        </div>
      </div>
    </div>
    <button v-if="hasMore" class="btn btn-secondary mt-3" @click="loadMoreComments">
      Xem Thêm
    </button>
  </div>
</template>

<script>
import { $http } from '@/plugins/http-wrapper'

export default {
  props: {
    movie: Object,
  },
  data() {
    return {
      comments: [],
      loading: false,
      error: null,
      newCommentContent: '',
      user: null,
      userID: null,
      page: 0,
      size: 5,
      hasMore: true,
    }
  },

  watch: {
    '$route.params.slug': {
      immediate: true,
      handler: async function (newSlug, oldSlug) {
        if (newSlug !== oldSlug) {
          this.fetchComments(0)
        }
      },
    },
  },
  methods: {
    loadMoreComments() {
      if (this.hasMore) {
        this.fetchComments(this.page + 1)
      }
    },
    redirectToLogin() {
      this.$router.push('/login')
    },
    // action get image
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
    // action fetch Comment
    async fetchComments(page = 0) {
      try {
        let slug = this.$route.params.slug
        console.log('fetch slug:', slug)
        const commentsRes = await $http.get(`/comments/movie/slug/${slug}/paged`, {
          page: page,
          size: this.size,
        })
        if (commentsRes) {
          if (page === 0) {
            this.comments = commentsRes
          } else {
            this.comments = this.comments.concat(commentsRes)
          }
          this.hasMore = commentsRes.length === this.size
          this.page = page
        }
      } catch (error) {
        console.error('Error fetching comments:', error.message)
      }
    },

    // action submit Comment
    async submitComment() {
      if (!this.newCommentContent.trim()) {
        return
      }
      try {
        const payload = {
          content: this.newCommentContent.trim(),
          userId: this.userID,
          movieId: this.movie.id,
        }
        console.log('fetch Data Error', payload)
        const res = await $http.post('/comments/create', payload)
        if (res) {
          this.newCommentContent = ''
          this.fetchComments(0)
        }
      } catch (error) {
        console.error('Error submitting comment:', error.message)
      }
    },
  },
  mounted() {
    this.fetchUserInfor()
    this.fetchComments(0)
  },
}
</script>

<style scoped>
.comment-avatar {
  width: 70px;
  /* Set avatar size */
  height: 70px;
  border-radius: 50%;
  /* Make it round */
  object-fit: cover;
  /* Ensure it covers the area */
}

.comment-content {
  flex: 1;
  /* Take remaining space */
  background: rgba(0, 0, 0, 0.05);
  /* Light background */
  padding: 10px;
  border-radius: 5px;
}

.login-before-comment {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
