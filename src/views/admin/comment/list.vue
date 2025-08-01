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
        <input v-model="movieTitle" placeholder="Enter movie title" @keyup.enter="fetchComments" />
        <button @click="fetchComments">Load Comments</button>

        <table v-if="comments.length" class="comments-table table table-bordered">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Comment Text</th>
              <th>Comment At</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="comment in comments" :key="comment.id">
              <td>{{ comment.userName }}</td>
              <td>{{ comment.content }}</td>
              <td>{{ formatDate(comment.createdAt) }}</td>
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
import axios from 'axios'

const movieTitle = ref('') // default movie title for demo
const comments = ref([])

const fetchComments = async () => {
  if (!movieTitle.value) {
    comments.value = []
    return
  }
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/list`, {
      movieTitle: movieTitle.value,
    })
    comments.value = response.data
  } catch (error) {
    console.error('Failed to fetch comments:', error)
    comments.value = []
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}

// Fetch comments on component mount
fetchComments()
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
