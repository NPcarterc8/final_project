<script setup lang="ts">
import { ref } from 'vue'
import { getAll, type User } from '@/models/user'
import UserCard from '@/components/UserCard.vue'

const user = ref<User[]>([])
user.value = getAll().data
</script>

<template>
  <div class="shelf">
    <UserCard v-for="user in user" :key="user.id" :user="user" />
  </div>
</template>

<style scoped>
.shelf {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.shelf .box {
  width: 17rem;
  flex-grow: 1;
}
</style>
