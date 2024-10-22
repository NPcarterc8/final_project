<script setup lang="ts">
import type { User } from '@/models/user'

const props = defineProps<{
  user: User
}>()
const { user } = props
</script>

<template>
  <div class="box">
    <div class="box-image">
      <img :src="user.image" alt="product.name" />
    </div>
    <div class="box-content">
      <h3>{{ user.firstName }} {{ user.lastName }}</h3>
      <i>{{ user.age }}</i>
      <p>{{ user.university }}</p>
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
