<script setup lang="ts">
import { getAll, getById, type User } from '@/models/user'
import { ref, onMounted, computed } from 'vue'

const props = defineProps<{
  workout: {
    id: number

    type: string

    duration: string

    date: string

    userId: number
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
  if (props.workout.userId) {
    fetchUserData(props.workout.userId)
  }
})

const postId = ref<string>('Unknown name')

const fetchPostId = async (id: number) => {
  const userData = await fetchUserData(id)
  postId.value = `${userData.firstName} ${userData.lastName}`
}

onMounted(() => {
  if (props.workout.id !== undefined) {
    fetchPostId(props.workout.id)
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
        <p><strong>Content:</strong> {{ workout.type }}</p>
        <p><strong>Date:</strong> {{ workout.date }}</p>
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
