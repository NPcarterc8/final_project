import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'
import { api } from './myFetch'

export async function getAll() {
  return api<DataListEnvelope<Comment>>('comments')
}

export async function getById(id: number) {
  return api<DataEnvelope<Comment>>(`comments/${id}`)
}

export function create(comment: Comment) {
  return api<DataEnvelope<Comment>>('comments', comment)
}

export function update(comment: Comment) {
  return api<DataEnvelope<Comment>>(`comments/${comment.id}`, comment, 'PATCH')
}

export function remove(id: number) {
  return api<DataEnvelope<Comment>>(`comments/${id}`, undefined, 'DELETE')
}

export type Comment = {
  id?: number
  content: string
  date: Date
  time: Date
  location: string
  workoutType: string
  userId: number
}
