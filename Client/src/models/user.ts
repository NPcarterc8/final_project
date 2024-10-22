import data from '../data/user.json'
import type { DataListEnvelope } from './dataEnvelope'
export function getAll(): DataListEnvelope<User> {
  return {
    data: data.items
  }
}

export interface User {
  id: number
  name: string
  email: string
  password: string
  role: string
}
