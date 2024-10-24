<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import LoginBadge from '@/components/LoginBadge.vue'

const isOpen = ref(false)
</script>

<template>
  <nav class="navbar is-info" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="30" height="30" />
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          :class="{ 'is-active': isOpen }"
          @click="isOpen = !isOpen"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" :class="{ 'is-active': isOpen }">
        <div class="navbar-start">
          <RouterLink to="/index" class="navbar-item"
            ><i class="fa fa-home" aria-hidden="true"></i>Home</RouterLink
          >
          <RouterLink to="/user" class="navbar-item"
            ><i class="fas fa-search"></i>Users Search</RouterLink
          >
          <div class="navbar-item has-dropdown is-hoverable">
            <div class="navbar-dropdown">
              <hr class="navbar-divider" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="navbar-item">
      <LoginBadge />
    </div>
  </nav>
</template>

<style scoped>
.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid blue;
}
</style>
