<script setup lang="ts">
import type { User } from '@/models/user'
defineProps<{
  User: User
}>()
</script>

<template>
  <div class="box">
    <div class="box-image">
      <img :src="User.thumbnail" alt="product.name" />
    </div>
    <div class="box-content">
      <h3>{{ User.title }}</h3>
      <p>{{ User.description }}</p>
      <p>{{ User.price }}</p>
    </div>
  </div>
</template>

<style scoped>
h3 {
  font-weight: bold;
}
</style>
