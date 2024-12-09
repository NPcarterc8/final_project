<script setup lang="ts">
import { ref, computed } from 'vue'
import { getAll as getAllUsers, type User } from '@/models/user'
import { getAll as getAllPosts, type Post } from '@/models/post'
import { refSession } from '@/models/session'
import PostComponent from '@/components/PostCard.vue'
//import { post } from 'node_modules/axios/index.cjs'
const posts = ref<Post[]>([])
const user = ref<User[]>([])
const session = refSession()
const isUser = computed(() => session.user?.role === 'user')
const searchQuery = ref('')

getAllPosts().then((response) => {
  posts.value = response.data
})

getAllUsers().then((response) => {
  user.value = response.data
})
</script>

<template>
  <div class="shelf">
    <PostComponent
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :user="user.find((u) => u.id === post.userId) ?? {}"
    />
  </div>
</template>

<style scoped>
.shelf {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Adjust the gap as needed */
  margin-left: 2rem; /* Adjust the margin as needed to shift right */
}

.search-bar {
  margin-bottom: 1rem; /* Adjust the margin as needed */
}

.user-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem; /* Adjust the gap as needed */
  margin-left: 2rem; /* Adjust the margin as needed to shift right */
}
</style>
