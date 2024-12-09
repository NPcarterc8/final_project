<script setup lang="ts">
import { ref, computed } from 'vue'
import { getAll as getAllUsers, type User } from '@/models/user'
import { getAll as getAllPosts, type Post } from '@/models/post'
import { refSession } from '@/models/session'
import PostComponent from '@/components/PostCard.vue'
import PostButton from '@/components/AddpostCard.vue'
const posts = ref<Post[]>([])
const users = ref<User[]>([])
const session = refSession()
const isUser = computed(() => session.user?.role === 'user')
const searchQuery = ref('')

getAllPosts().then((response) => {
  posts.value = response.data
})

getAllUsers().then((response) => {
  users.value = response.data
})
</script>

<template>
  <div class="shelf">
    <PostButton
      :post="{
        id: 0,
        content: '',
        date: '',
        time: '',
        location: '',
        workoutType: '',
        userId: 0,
        postType: ''
      }"
    />
    <PostComponent
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :user="
        users.find((u) => u.id === post.userId) ?? {
          firstName: '',
          lastName: '',
          age: 0,
          university: '',
          role: '',
          image: ''
        }
      "
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
