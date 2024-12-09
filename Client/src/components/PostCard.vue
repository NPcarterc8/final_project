<script setup lang="ts">
import { getAll, getById, type User } from '@/models/user'
import { ref, onMounted, computed } from 'vue'

const props = defineProps<{
  post: {
    id?: number
    content: string
    date: string
    time: string
    location: string
    workoutType: string
    userId: number
    postType?: string
  }
}>()

const user = ref<{
  id?: number
  firstName: string
  lastName: string
  age: number
  university: string
  role: string
  image: string
}>()

const fetchUserData = async (userId: number) => {
  const userModel = await getById(userId)
  return (user.value = userModel.data)
}

onMounted(() => {
  if (props.post.userId) {
    fetchUserData(props.post.userId)
  }
})

const postId = ref<string>('Unknown name')

const fetchPostId = async (id: number) => {
  const userData = await fetchUserData(id)
  postId.value = `${userData.firstName} ${userData.lastName}`
}

onMounted(() => {
  if (props.post.id !== undefined) {
    fetchPostId(props.post.id)
  }
})
</script>

<template>
  <div class="post-card" v-if="user">
    <div class="user-info">
      <div class="box-image">
        <img :src="user.image" :alt="user.firstName + ' ' + user.lastName" />
      </div>

      <div class="post-content">
        <p><strong>Post Name:</strong> {{ postId }}</p>
        <p><strong>Content:</strong> {{ post.content }}</p>
        <p><strong>Date:</strong> {{ post.date }}</p>
        <p><strong>Time:</strong> {{ post.time }}</p>
        <p><strong>Location:</strong> {{ post.location }}</p>
        <p><strong>Workout Type:</strong> {{ post.workoutType }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-card {
  display: flex;
  flex-direction: column;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.box-image {
  margin-right: 1rem;
}

.box-content {
  display: flex;
  flex-direction: column;
}

.box-content table {
  border-collapse: collapse;
  width: 100%;
}

.box-content td {
  padding: 0.5rem;
  border: 1px solid #ddd;
}

.box-content td strong {
  font-weight: bold;
}

.post-content {
  margin-top: 1rem;
}
</style>
