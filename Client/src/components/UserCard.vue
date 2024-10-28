<script>
import { computed, ref } from 'vue'
import { refSession } from '@/models/session'
//import { getAll } from '@/models/users'
const session = refSession()
const isUser = computed(() => session.user?.role === 'user')
const isAdmin = computed(() => session.user?.role === 'admin')
const roles = ref(['user', 'admin', 'guest']) // Add more roles as needed

export default {
  props: {
    user: Object
  },
  setup() {
    const isVisible = ref(true)

    const deletePost = (postId) => {
      console.log(`Deleting post with ID: ${postId}`)
      isVisible.value = false
    }

    return {
      isUser,
      isAdmin,
      roles,
      isVisible,
      deletePost
    }
  }
}
</script>

<template>
  <div>
    <div v-if="isAdmin && isVisible" class="box">
      <div class="box-image">
        <img :src="user.image" alt="user.name" />
      </div>
      <div class="box-content">
        <button v-if="isAdmin" @click="deletePost(user.id)" class="delete-button">Delete</button>
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
        </table>
        <div class="role-dropdown">
          <label for="role"><strong>Role:</strong></label>
          <select id="role" v-model="user.role">
            <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
          </select>
        </div>
      </div>
    </div>
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
.delete-button {
  background: none;
  border: none;
  color: red;
  font-size: 1.2em;
  cursor: pointer;
}
</style>
