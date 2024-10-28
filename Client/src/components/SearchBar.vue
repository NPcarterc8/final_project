<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  searchQuery: string
}>()

const emit = defineEmits(['update:searchQuery'])

function updateQuery(event: Event) {
  emit('update:searchQuery', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <input
    class="input"
    type="text"
    :value="searchQuery"
    @input="updateQuery"
    placeholder="Search users..."
  />
</template>
