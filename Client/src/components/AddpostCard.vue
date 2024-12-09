<script setup lang="ts">
import { getAll as getAllUsers, getById as getUserById, type User } from '@/models/user'
import { getAll as getAllPosts, getById as getPostById, update, type Post } from '@/models/post'
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

import { refSession } from '@/models/session'

const session = refSession()
const currentUserId = session.user?.id || 0

const fetchUserData = async (userId: number) => {
  const userModel = await getUserById(userId)
  user.value = userModel.data
}

onMounted(() => {
  if (props.post.userId) {
    fetchUserData(props.post.userId)
  }
})

const postName = computed(() => {
  return `${user.value?.firstName ?? ''} ${user.value?.lastName ?? ''}'s Post`
})

const showForm = ref(false)
const newPost = ref({
  content: '',
  date: '',
  time: '',
  location: '',
  workoutType: '',
  userId: currentUserId,
  postType: ''
})

const toggleForm = () => {
  newPost.value.userId = currentUserId
  showForm.value = !showForm.value
}

const submitPost = async () => {
  try {
    const response = await update(newPost.value)
    console.log('New Post:', response.data)
    toggleForm()
  } catch (error) {
    console.error('Error submitting post:', error)
  }
}
</script>

<template>
  <div>
    <button @click="toggleForm">Add New Post</button>
    <div v-if="showForm" class="form-modal">
      <form @submit.prevent="submitPost">
        <label>
          Content:
          <input v-model="newPost.content" type="text" required />
        </label>
        <label>
          Date:
          <input v-model="newPost.date" type="date" required />
        </label>
        <label>
          Time:
          <input v-model="newPost.time" type="time" required />
        </label>
        <label>
          Location:
          <input v-model="newPost.location" type="text" required />
        </label>
        <label>
          Workout Type:
          <input v-model="newPost.workoutType" type="text" required />
        </label>
        <label>
          User ID:
          <input v-model="newPost.userId" type="number" required readonly />
        </label>
        <label>
          Post Type:
          <input v-model="newPost.postType" type="text" />
        </label>
        <button type="submit">Submit</button>
        <button type="button" @click="toggleForm">Cancel</button>
      </form>
    </div>

    <div class="postcard" v-if="user">
      <div class="postcard-header">
        <img :src="user.image" :alt="user.firstName + ' ' + user.lastName" class="postcard-image" />
        <div class="postcard-user-info">
          <h2>{{ user.firstName }} {{ user.lastName }}</h2>
          <p>{{ user.university }}</p>
        </div>
      </div>

      <div class="post-content">
        <p><strong>Post Name:</strong> {{ postName }}</p>
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
.postcard {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 1rem auto;
  background-color: #fff;
}

.postcard-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.postcard-image {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 1rem;
}

.postcard-user-info {
  text-align: center;
}

.post-content {
  text-align: center;
  margin-top: 1rem;
}

.post-content p {
  margin: 0.5rem 0;
}

.form-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  z-index: 1000;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 1rem;
}

button {
  margin-top: 1rem;
}
</style>
