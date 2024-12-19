<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { getAll, update, type User } from '@/models/user'
//import AutoComplete from './AutoComplete.vue'
const debounce = (func: Function, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

const props = defineProps<{
  searchQuery: string
}>()

const emit = defineEmits(['update:searchQuery'])

const results = ref<User[]>([])
const allUsers = ref<User[]>([])

function updateQuery(event: Event) {
  const query = (event.target as HTMLInputElement).value
  emit('update:searchQuery', query)
}

const fetchResults = debounce((query: string) => {
  if (query.length > 0) {
    const lowerCaseQuery = query.toLowerCase()
    results.value = allUsers.value.filter(
      (user) =>
        user.username.toLowerCase().includes(lowerCaseQuery) ||
        user.firstName.toLowerCase().includes(lowerCaseQuery) ||
        user.lastName.toLowerCase().includes(lowerCaseQuery) ||
        user.email.toLowerCase().includes(lowerCaseQuery)
    )
  } else {
    results.value = []
  }
}, 300)

async function fetchAllUsers() {
  try {
    const response = await getAll()
    allUsers.value = response.data
  } catch (error) {
    console.error('Error fetching users:', error)
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

fetchAllUsers()
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
          {{ user.firstName }} {{ user.lastName }}
          <span style="flex-grow: 1; margin-left: 8px"></span>
          <button @click="handleAddFriend(user)" class="add-friend-button" style="color: red">
            Add Friend
          </button>
        </li>
      </ul>
    </div>
    <div v-else class="no-results">No results found.</div>
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

.no-results {
  margin-top: 8px;
  color: #888;
  text-align: center;
}
</style>
