<script setup lang="ts" name="PostPage">
import { ref, computed, onMounted } from 'vue'
import { type User } from '@/models/user'
import { refSession } from '@/models/session'
import { getById } from '@/models/comments' // Assuming you have a fetchComments function
import type { Comment } from '@/models/comments'
const session = refSession()

const user = computed(() => session.user)

const comments = ref<Comment[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

onMounted(() => {
  comments.value = []
  if (user.value) {
    if (user.value && user.value.id !== undefined) {
      getById(user.value.id)
        .then((commentsData) => {
          if (Array.isArray(commentsData.data)) {
            comments.value = commentsData.data as Comment[] // Assuming commentsData has a 'data' property that contains the comments array
          } else {
            throw new Error('Invalid data format')
          }
        })
        .catch((err) => {
          error.value = 'Failed to load data.'
        })
        .finally(() => {
          isLoading.value = false
        })
    }
  }
})
</script>

<template>
  <div class="profile-page">
    <div v-if="isLoading" class="loading">
      <p>Loading...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="user" class="profile">
      <div class="profile-header">
        <img :src="user.image" alt="Profile Picture" class="profile-picture" v-if="user.image" />
        <h1>{{ user.username }}</h1>
      </div>
      <div class="profile-details">
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Address:</strong> {{ user.address.address }}</p>
        <p><strong>Phone:</strong> {{ user.phone }}</p>
      </div>
      <div class="profile-comments">
        <h2>Comments</h2>
        <ul>
          <li v-for="comment in comments" :key="comment.id">
            <p>
              <strong>{{ user.username }}:</strong> {{ comment.content }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  font-family: Arial, sans-serif;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading,
.error {
  color: red;
  font-size: 18px;
}

.profile {
  width: 100%;
  max-width: 600px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.profile-picture {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.profile-details p {
  color: #666;
  font-size: 16px;
  margin: 5px 0;
}

.profile-comments {
  margin-top: 20px;
}

.profile-comments h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.profile-comments ul {
  list-style-type: none;
  padding: 0;
}

.profile-comments li {
  background: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}
</style>
