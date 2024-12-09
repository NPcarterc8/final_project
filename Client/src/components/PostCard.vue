<script setup lang="ts">
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
    <img :src="user.image" :alt="user.firstName + ' ' + user.lastName" />
  </div>

  <div class="box-content">
    <table>
      <tr>
        <td><strong>Name:</strong></td>
        <td>{{ user.firstName + ' ' + user.lastName }}</td>
      </tr>
      <tr>
        <td><strong>Age:</strong></td>
        <td>{{ user.age }}</td>
      </tr>
      <tr>
        <td><strong>University:</strong></td>
        <td>{{ user.university }}</td>
      </tr>
      <tr>
        <td><strong>Role:</strong></td>
        <td>{{ user.role }}</td>
      </tr>
    </table>
    <p><strong>Workout Type:</strong> {{ post.workoutType }}</p>
    <p><strong>Location:</strong> {{ post.location }}</p>
    <p><strong>Time:</strong> {{ post.time }}</p>
    <p><strong>Date:</strong> {{ post.date }}</p>
    <p>{{ post.content }}</p>
  </div>
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
