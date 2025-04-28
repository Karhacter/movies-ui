<template>
  <div class="content-wrapper" style="background-color: #ffffff">
    <section
      class="content-body"
      style="padding-bottom: 350px; padding-left: 20px; padding-right: 20px"
    >
      <div class="comment-list pt-4">
        <h2 class="pb-3 text-warning">
          Comments for Movie:
          <mark>
            {{ movieTitle }}
          </mark>
        </h2>
        <div class="text-end mb-4">
          <router-link :to="{ name: 'CommentIndex' }" class="btn btn-sm btn-info">
            <i class="fa fa-arrow-left"></i> Quay Về
          </router-link>
        </div>

        <table v-if="comments.length" class="comments-table table table-bordered">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Comment Text</th>
              <th>Comment At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-for="comment in comments" :key="comment.id">
            <tr v-if="comment.statusDelete != 1">
              <td>{{ comment.userName }}</td>
              <td>
                <input
                  v-if="editingCommentId === comment.id"
                  v-model="editableContent"
                  class="form-control"
                  type="text"
                />
                <span v-else>{{ comment.content }}</span>
              </td>
              <td>{{ formatDate(comment.createdAt) }}</td>

              <td>
                <div class="function_style col-auto text-center">
                  <button
                    class="btn btn-sm btn-primary me-2"
                    @click="
                      editingCommentId === comment.id ? saveComment(comment) : editComment(comment)
                    "
                  >
                    <i
                      class="fa"
                      :class="editingCommentId === comment.id ? 'fa-save' : 'fa-edit'"
                    ></i>
                    {{ editingCommentId === comment.id ? 'Lưu' : 'chỉnh sửa' }}
                  </button>
                  <button @click="deleteComment(comment.id)" class="btn btn-sm btn-danger me-2">
                    <i class="fa fa-trash"></i> xóa
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <p v-else>No comments found for this movie.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { $http } from '@/plugins/http-wrapper'

const route = useRoute()
const movieTitle = ref(route.query.movieTitle || '')
const comments = ref([])

const editingCommentId = ref(null)
const editableContent = ref('')
const editableUserId = ref(null)

async function fetchComments() {
  if (!movieTitle.value) {
    comments.value = []
    return
  }
  try {
    const response = await axios.get('http://localhost:8080/api/comments/list', {
      params: { movieTitle: movieTitle.value },
    })
    comments.value = response.data
    console.log(response)
  } catch (error) {
    console.error('Failed to fetch comments:', error)
    comments.value = []
  }
}

function editComment(comment) {
  editingCommentId.value = comment.id
  editableContent.value = comment.content
  editableUserId.value = comment.userId
}

async function saveComment(comment) {
  try {
    const response = await $http.put(`/comments/update/${comment.id}`, {
      content: editableContent.value,
      userId: editableUserId.value,
    })
    if (response) {
      // Update the comment content locally
      const index = comments.value.findIndex((c) => c.id === comment.id)
      if (index !== -1) {
        comments.value[index].content = editableContent.value
      }
      editingCommentId.value = null
      editableContent.value = ''
    }
  } catch (error) {
    console.error('Failed to update comment:', error)
  }
}

async function deleteComment(id) {
  try {
    const response = await $http.delete(`/comments/delete/${id}`)
    if (response) fetchComments()
  } catch (e) {
    console.error('Failed', e)
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}

fetchComments()
// Fetch comments on component mount
</script>

<style scoped>
@import '@/assets/css/adminlte.css';

input {
  padding: 6px 10px;
  margin-right: 10px;
  font-size: 14px;
}

button {
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
}

.comments-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.comments-table th,
.comments-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.comments-table th {
  background-color: #f2f2f2;
}
</style>
