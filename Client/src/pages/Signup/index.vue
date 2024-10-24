<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goToLogin() {
  router.push('/login')
}
</script>
<template>
  <div class="container">
    <form>
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="email" placeholder="Your email" />
        </div>
      </div>

      <div class="field">
        <label class="label">Message</label>
        <div class="control">
          <textarea class="textarea" placeholder="Your message"></textarea>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button class="button is-primary" @click.prevent="goToLogin">Sign Up</button>
        </div>
      </div>
    </form>
  </div>
</template>
