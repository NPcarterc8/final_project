<script setup>
import { ref } from 'vue'
import { refSession } from '@/models/session'

const session = refSession()
const posts = ref([])
const newPost = ref('')
const workoutType = ref('')
const location = ref('')

const addPost = () => {
  if (newPost.value.trim() && workoutType.value.trim() && location.value.trim()) {
    posts.value.push({
      id: Date.now(),
      content: newPost.value.trim(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      location: location.value.trim(),
      workoutType: workoutType.value.trim(),
      userImage: session.user?.image || '' // Get the current user's image from the session
    })
    newPost.value = ''
    workoutType.value = ''
    location.value = ''
  }
}
</script>

<template>
  <div class="container">
    <h1>Comments/Posts</h1>
    <div class="post-form">
      <textarea v-model="newPost" placeholder="Write a comment or post..."></textarea>
      <input v-model="workoutType" placeholder="Type of workout" />
      <input v-model="location" placeholder="Location" />
      <button @click="addPost">Submit</button>
    </div>
    <div class="post-list">
      <div v-for="post in posts" :key="post.id" class="post-item">
        <img :src="post.userImage" alt="User Image" class="user-image" />
        <p><strong>Date:</strong> {{ post.date }}</p>
        <p><strong>Time:</strong> {{ post.time }}</p>
        <p><strong>Location:</strong> {{ post.location }}</p>
        <p><strong>Workout Type:</strong> {{ post.workoutType }}</p>
        <p>{{ post.content }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

h1 {
  font-size: 2em;
  text-align: center;
  color: #000;
  margin-bottom: 1rem;
}

.post-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.post-form textarea,
.post-form input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.post-form textarea {
  height: 100px;
  resize: none;
}

.post-form button {
  align-self: flex-end;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.post-form button:hover {
  background-color: #0056b3;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.post-item {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.user-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
}
</style>
