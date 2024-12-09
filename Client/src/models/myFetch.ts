const API_URL = 'http://localhost:3000/api/v1/'

import { createClient } from '@supabase/supabase-js'

//const supabaseUrl = createClient(import.meta.env.SUPABASE_URL, import.meta.env.SUPABASE_ANON_KEY)

export function rest<T>(url: string, data?: any, method?: string): Promise<T> {
  return fetch(url, {
    method: method ?? (data ? 'POST' : 'GET'),
    headers: {
      'Content-Type': 'application/json'
    },
    body: data ? JSON.stringify(data) : undefined
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`)
    }
    return res.json()
  })
}

export function api<T>(url: string, data?: any, method?: string): Promise<T> {
  return rest<T>(API_URL + url, data, method)
}
