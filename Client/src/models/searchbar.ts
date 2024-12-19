import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'
import { api } from './myFetch'

export async function getAll() {
  return api<DataListEnvelope<Searchbar>>('users')
}

export async function getById(id: number) {
  return api<DataEnvelope<Searchbar>>(`users/${id}`)
}

export function create(user: Searchbar) {
  return api<DataEnvelope<Searchbar>>('users', user)
}

export function update(user: Searchbar) {
  return api<DataEnvelope<Searchbar>>(`users/${user.id}`, user, 'PATCH')
}

export function remove(id: number) {
  return api<DataEnvelope<Searchbar>>(`users/${id}`, undefined, 'DELETE')
}

export type Searchbar = {
  id: number
  username: string
  email: string
  password: string
  role: string
  age: number
  firstName: string
  birthDate: Date
  lastName: string
  image: string
  university: string
  phone: string
}
