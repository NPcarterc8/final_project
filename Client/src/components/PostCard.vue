<script setup lang="ts">
import { refSession } from '@/models/session'
import { computed, ref } from 'vue'

const session = refSession()

defineProps<{
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
  user: {
    firstName: string
    lastName: string
    age: number
    university: string
    role: string
    image: string
  }
}>()
</script>

<template>
  <div class="box-image">
    <img :src="user.image" alt="user.firstName + ' ' + user.lastName" />
  </div>
  <tbody>
    <tr>
      <td><strong>Name:</strong></td>
      <td>{{ user.firstName + ' ' + user.lastName }}</td>
    </tr>
    <tr>
      <td><strong>Age:</strong></td>
      <td>{{ post.time }}</td>
    </tr>
    <tr>
      <td><strong>University:</strong></td>
      <td>{{ post.workoutType }}</td>
    </tr>
  </tbody>
</template>

<style scoped>
.box {
  display: flex;
  align-items: center;
  margin-left: 2rem; /* Adjust the margin as needed to shift right */
}

.box-image {
  margin-right: 1rem; /* Adjust the margin as needed */
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

.role-dropdown {
  margin-top: 1rem; /* Adjust the margin as needed */
}

.role-dropdown select {
  padding: 0.25rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
