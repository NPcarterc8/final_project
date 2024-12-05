import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'
import { api } from './myFetch'

export async function getAll() {
  return api<DataListEnvelope<Post>>('post')
}

export async function getById(id: number) {
  return api<DataEnvelope<Post>>(`post/${id}`)
}

export function create(post: Post) {
  return api<DataEnvelope<Post>>('post', post)
}

export function update(user: Post) {
  return api<DataEnvelope<Post>>(`post/${user.id}`, user, 'PATCH')
}

export function remove(id: number) {
  return api<DataEnvelope<Post>>(`post/${id}`, undefined, 'DELETE')
}

export interface Post {
  id: number
  content: string
  date: string
  time: string
  location: string
  workoutType: string
}
