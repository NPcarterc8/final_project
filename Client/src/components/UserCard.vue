<script>
import { computed } from 'vue'
import { refSession } from '@/models/session'

const session = refSession()
const isUser = computed(() => session.user?.role === 'user')
const isAdmin = computed(() => session.user?.role === 'admin')

export default {
  props: {
    user: Object
  },
  setup() {
    return {
      isUser,
      isAdmin
    }
  }
}
</script>

<template>
  <div>
    <div v-if="isAdmin" class="box">
      <div class="box-image">
        <img :src="user.image" alt="user.name" />
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
        </table>
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
</style>
