<script setup lang="ts">
import type { User } from '@/models/user'

const props = defineProps<{
  user: User
}>()
const { user } = props
</script>

<template>
  <div class="box">
    <div class="box-content">
      <h3>{{ user.name }}</h3>
      <i>{{ user.email }}</i>
      <p>{{ user.role }}</p>
    </div>
  </div>
</template>

<style scoped>
h3 {
  font-weight: bold;
}

i {
  color: #888;
}

.price {
  color: chocolate;
  font-size: 2em;
  font-weight: bold;
  float: right;
}
</style>
