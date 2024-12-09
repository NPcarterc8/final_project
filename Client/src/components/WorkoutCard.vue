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
  firstName: string
  lastName: string
  age: number
  university: string
  role: string
  image: string
} | null>(null)

const fetchUserData = async (userId: number) => {
  const userModel = await getById(userId)
  user.value = userModel.data
}

onMounted(() => {
  fetchUserData(props.workout.userId)
})
</script>

<template>
  <div class="postcard" v-if="user">
    <div class="postcard-header">
      <img :src="user.image" :alt="user.firstName + ' ' + user.lastName" class="postcard-image" />
      <div class="postcard-user-info">
        <h2>{{ user.firstName }} {{ user.lastName }}</h2>
        <p>{{ user.university }}</p>
      </div>
    </div>
    <div class="postcard-content">
      <p><strong>Workout Type:</strong> {{ workout.type }}</p>
      <p><strong>Duration:</strong> {{ workout.duration }}</p>
      <p><strong>Date:</strong> {{ workout.date }}</p>
    </div>
  </div>
</template>

<style scoped>
.postcard {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
}

.postcard-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #f7f7f7;
  border-bottom: 1px solid #ddd;
}

.postcard-image {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 1rem;
}

.postcard-user-info {
  flex: 1;
}

.postcard-user-info h2 {
  margin: 0;
  font-size: 1.25rem;
}

.postcard-user-info p {
  margin: 0;
  color: #666;
}

.postcard-content {
  padding: 1rem;
}

.postcard-content p {
  margin: 0.5rem 0;
}
</style>
<template></template>
<template></template>
