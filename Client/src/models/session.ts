import type { User } from '@/models/user'
import { reactive } from 'vue'

const session = reactive({
  user: null as User | null
})

export function login(user: User) {
  session.user = user
}

export function logout() {
  session.user = null
}

export const refSession = () => session
