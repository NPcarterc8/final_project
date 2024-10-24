<script setup lang="ts">
import { getAll, type User } from '@/models/user'
import { ref } from 'vue'
import { refSession, useLogin } from '@/models/session'
import { RouterLink } from 'vue-router'

const session = refSession()
const users = getAll().data.slice(0, 5)
const { login, logout } = useLogin()

const showForm = ref(false) // Reactive state for form visibility

function doLogin(user: User) {
  login(user)
}

function doLogout() {
  logout()
}

function toggleLogo() {
  showForm.value = !showForm.value
}
</script>

<template>
  <div class="badge" v-if="session.user">
    <img :src="session.user.image" alt="Avatar" />
    <div>
      {{ session.user.firstName }} {{ session.user.lastName }} <br />
      {{ session.user.email }}
    </div>
    <div>( <a class="is-danger" @click.prevent="doLogout"> Not You? </a>)</div>
  </div>
  <div class="buttons" v-else>
    <RouterLink to="/Signup" class="button is-primary" @click.native="toggleLogo">
      <strong> Sign up</strong>
    </RouterLink>
    <div class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link"> Login </a>
      <div class="navbar-dropdown">
        <a v-for="user in users" :key="user.id" class="navbar-item" @click="doLogin(user)">
          {{ user.firstName }} {{ user.lastName }}
        </a>
      </div>
    </div>
  </div>
  <div v-if="showForm">
    <RouterLink to="/Signup" class="button is-primary" @click.native="toggleLogo">
      <strong> Sign up</strong>
    </RouterLink>
  </div>
</template>
