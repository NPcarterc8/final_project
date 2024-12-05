<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type User } from '@/models/user'
import { refSession, type Session } from '@/models/session'

const user = ref<User | null>(null)
const session = ref<Session | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const sessionData = await refSession()
    session.value = sessionData
    user.value = sessionData.user // Set user from session data
  } catch (err) {
    error.value = 'Failed to load data.'
  } finally {
    isLoading.value = false
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
        <!-- Add more user information as needed -->
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
</style>
