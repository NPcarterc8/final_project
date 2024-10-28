import data from '../data/comments.json'
import type { DataListEnvelope } from './dataEnvelope'

const LOCAL_STORAGE_KEY = 'posts'

function loadPostsFromLocalStorage(): Post[] {
  const savedPosts = localStorage.getItem(LOCAL_STORAGE_KEY)
  return savedPosts ? JSON.parse(savedPosts) : data.items
}

function savePostsToLocalStorage(posts: Post[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts))
}

export function getAll(): DataListEnvelope<Post> {
  const posts = loadPostsFromLocalStorage()
  return {
    data: posts,
    total: posts.length
  }
}

export function addPost(post: Post): void {
  const posts = loadPostsFromLocalStorage()
  posts.push(post)
  savePostsToLocalStorage(posts)
}

export interface Post {
  id: number
  content: string
  date: string
  time: string
  location: string
  workoutType: string
}
