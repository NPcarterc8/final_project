import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'
import { api } from './myFetch'

export async function getAll() {
  return api<DataListEnvelope<Workout>>('workout')
}

export async function getById(id: number) {
  return api<DataEnvelope<Workout>>(`workout/${id}`)
}

export function create(workout: Workout) {
  return api<DataEnvelope<Workout>>('workout', workout)
}

export function update(workout: Workout) {
  return api<DataEnvelope<Workout>>(`workout/${workout.id}`, workout, 'PATCH')
}

export function remove(id: number) {
  return api<DataEnvelope<Workout>>(`workout/${id}`, undefined, 'DELETE')
}

export interface Workout {
  id: number

  type: string

  duration: string

  date: string

  userId: number
}
