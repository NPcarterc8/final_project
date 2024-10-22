import data from '../data/user.json'
import type { DataListEnvelope } from './dataEnvelope'
export function getAll(): DataListEnvelope<User> {
  return {
    data: data.items
  }
}

export interface User {
  id: number
  firstName: string
  lastName: string
  age: number
  university: string
  image: string
}
