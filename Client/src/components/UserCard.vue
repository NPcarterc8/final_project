<script setup lang="ts">
import { ref, computed } from 'vue'
import { refSession } from '@/models/session'
import type { User } from '@/models/user'
import SearchBar from './SearchBar.vue'

const props = defineProps<{
  user: User
}>()
const { user } = props

const session = refSession()
const searchQuery = ref('')

const isUser = computed(() => session.user?.role === 'user')
const isAdmin = computed(() => session.user?.role === 'admin')
</script>

<template>
  <div>
    <div v-if="isAdmin" class="box">
      <div class="box-image">
        <img :src="user.image" alt="user.name" />
      </div>
      <div class="box-content">
        <h3>{{ user.firstName + ' ' + user.lastName }}</h3>
        <i>{{ user.age }}</i>
        <p>{{ user.university }}</p>
      </div>
    </div>
  </div>
</template>
