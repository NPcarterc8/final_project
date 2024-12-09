import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'
import { api } from './myFetch'

export async function getAll() {
  return api<DataListEnvelope<User>>('users')
}

export async function getById(id: number) {
  return api<DataEnvelope<User>>(`users/${id}`)
}

export function create(user: User) {
  return api<DataEnvelope<User>>('users', user)
}

export function update(user: User) {
  return api<DataEnvelope<User>>(`users/${user.id}`, user, 'PATCH')
}

export function remove(id: number) {
  return api<DataEnvelope<User>>(`users/${id}`, undefined, 'DELETE')
}

export type User = {
  id?: number
  username: string
  firstName: string

  lastName: string

  email: string

  phone: string

  password: string

  birthDate: string

  image: string

  address?: {
    address: string

    city: string

    state: string

    stateCode: string

    postalCode: string

    country: string
  }

  role: string

  age: number

  university: string
}
