<script setup lang="ts">
import { ref, computed } from 'vue'
import { getAll, type User } from '@/models/user'
import { refSession } from '@/models/session'
import UserCard from '@/components/UserCard.vue'
import SearchBar from '@/components/SearchBar.vue'

const user = ref<User[]>([])
const session = refSession()
const isUser = computed(() => session.user?.role === 'user')
const searchQuery = ref('')

getAll().then((response) => {
  user.value = response.data
})
</script>

<template>
  <div class="shelf">
    <SearchBar v-if="isUser" v-model:searchQuery="searchQuery" class="search-bar" />
    <div class="user-cards">
      <UserCard v-for="user in user" :key="user.id" :user="user" />
    </div>
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
