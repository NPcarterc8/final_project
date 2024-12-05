<script setup lang="ts">
import { ref, watch } from 'vue'
import { getAll, update, type User } from '@/models/user'

const props = defineProps<{
  searchQuery: string
}>()

const emit = defineEmits(['update:searchQuery'])

const results = ref<User[]>([])

function updateQuery(event: Event) {
  const query = (event.target as HTMLInputElement).value
  emit('update:searchQuery', query)
  fetchResults(query)
}

async function fetchResults(query: string) {
  if (query.length > 2) {
    try {
      const response = await getAll()
      const users: User[] = response.data
      results.value = users.filter((user) =>
        user.username.toLowerCase().includes(query.toLowerCase())
      )
    } catch (error) {
      console.error('Error fetching search results:', error)
    }
  } else {
    results.value = []
  }
}

async function handleAddFriend(user: User) {
  try {
    await update(user)
    alert('Friend added successfully!')
  } catch (error) {
    console.error('Error adding friend:', error)
  }
}

watch(
  () => props.searchQuery,
  (newQuery) => {
    fetchResults(newQuery)
  }
)
</script>

<template>
  <div>
    <input
      class="input"
      type="text"
      :value="searchQuery"
      @input="updateQuery"
      placeholder="Search users..."
    />
    <div v-if="results.length" class="results-box">
      <ul>
        <li v-for="user in results" :key="user.id">
          <img :src="user.image" alt="User Avatar" />
          {{ user.username }}
          <span style="flex-grow: 1; margin-left: 8px">{{ user.username }}</span>
          <button @click="handleAddFriend(user)" class="add-friend-button">Add Friend</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.results-box {
  border: 1px solid #ccc;
  padding: 8px;
  margin-top: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.results-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.results-box li {
  display: flex;
  align-items: center;
  padding: 4px 0;
}

.results-box img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 8px;
}
</style>
