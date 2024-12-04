<script setup lang="ts">
import { getAll, type User } from '@/models/user'
import { ref } from 'vue'
import { refSession, useLogin } from '@/models/session'
import { useRouter } from 'vue-router' // Import useRouter

const session = refSession()
const users = ref<User[]>([])

getAll().then((response) => {
  users.value = response.data.slice(0, 5)
})
const { login, logout } = useLogin()
const router = useRouter() // Initialize router

function doLogin(user: User) {
  login(user)
  router.push('/index') // Redirect to user index page after login
}

function doLogout() {
  logout()
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
    <RouterLink to="/Signup" class="button is-primary">
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
</template>
