import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'
import { api } from './myFetch'

export async function getAll() {
  return api<DataListEnvelope<Comment>>('comment')
}

export async function getById(id: number) {
  return api<DataEnvelope<Comment>>(`comment/${id}`)
}

export function create(comment: Comment) {
  return api<DataEnvelope<Comment>>('comment', comment)
}

export function update(comment: Comment) {
  return api<DataEnvelope<Comment>>(`comment/${comment.id}`, comment, 'PATCH')
}

export function remove(id: number) {
  return api<DataEnvelope<Comment>>(`comment/${id}`, undefined, 'DELETE')
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
