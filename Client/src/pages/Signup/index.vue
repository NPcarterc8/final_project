<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')

const router = useRouter()

function handleSubmit() {
  // Handle form submission logic here
  // For example, send the form data to the server
  const userData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value
  }

  // Simulate a successful sign-up and redirect to the login page
  console.log('User data:', userData)
  router.push('/login')
}
</script>
<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label class="label">First Name</label>
        <div class="control">
          <input
            class="input"
            type="text"
            v-model="firstName"
            placeholder="Your first name"
            required
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Last Name</label>
        <div class="control">
          <input
            class="input"
            type="text"
            v-model="lastName"
            placeholder="Your last name"
            required
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="email" v-model="email" placeholder="Your email" required />
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input
            class="input"
            type="password"
            v-model="password"
            placeholder="Your password"
            required
          />
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button class="button is-primary" type="submit">Sign Up</button>
        </div>
      </div>
    </form>
  </div>
</template>
