import data from '../data/user.json'
import type { DataListEnvelope } from './dataEnvelope'
export function getAll(): DataListEnvelope<User> {
  return {
    data: data.items,
    total: data.total
  }
}

interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface User {
  id: number
  title: string
  description: string
  category: string
  price: number
  rating: number
  tags: string[]
  brand?: string
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  reviews: Review[]
  returnPolicy: string
  minimumOrderQuantity: number
  images: string[]
  thumbnail: string
}
