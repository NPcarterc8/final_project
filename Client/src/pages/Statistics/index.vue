<script setup lang="ts">
import { ref } from 'vue'
import { getAll as getAllUsers, type User } from '@/models/user'
import { getAll as getAllWorkouts, type Workout } from '@/models/workout'
import { refSession } from '@/models/session'
import WorkoutCard from '@/components/WorkoutCard.vue'
//import WorkButton from '@/components/AddworkCard.vue'
const workout = ref<Workout[]>([])
const user = ref<User[]>([])
const session = refSession()

getAllWorkouts().then((response) => {
  workout.value = response.data
})

getAllUsers().then((response) => {
  user.value = response.data
})
</script>

<template>
  <div class="shelf">
    <WorkoutCard
      v-for="workout in workout"
      :key="workout.id"
      :workout="workout"
      :user="
        user.find((u) => u.id === session.user?.id) ?? {
          firstName: '',
          lastName: '',
          age: 0,
          university: '',
          role: '',
          image: ''
        }
      "
    />
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
