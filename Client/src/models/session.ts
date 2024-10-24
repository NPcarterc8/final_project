import type { User } from '@/models/user'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const session = reactive({
  user: null as User | null
})

export function useSignupForm() {
  const router = useRouter()
  return {
    login(user: User) {
      session.user = user
    },
    logout() {
      session.user = null
      router.push('/Signup')
    }
  }
}

export function useLogin() {
  const router = useRouter()
  return {
    login(user: User) {
      session.user = user
    },
    logout() {
      session.user = null
      router.push('/login')
    }
  }
}

export const refSession = () => session
