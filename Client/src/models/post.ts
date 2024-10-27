import data from '../data/comments.json'
import type { DataListEnvelope } from './dataEnvelope'

export function getAll(): DataListEnvelope<Post> {
  return {
    data: data.items,
    total: data.items.length
  }
}

export interface Post {
  id: number
  content: string
  date: string
  time: string
  location: string
  workoutType: string
}
