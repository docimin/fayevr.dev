'use server'
import { databases } from '@/app/appwrite-server'

let lastBoopTime = 0
const cooldown = 200 // cooldown period in milliseconds

export async function updateVote(id: string, vote: 'up' | 'down' | null) {
  const now = Date.now()
  if (now < lastBoopTime + cooldown) {
    // If it's too soon to send another boop, return without doing anything
    return
  }

  const data = await databases.getDocument('main', 'voting', id)
  if (!data) {
    return
  }

  lastBoopTime = now // update the last boop time

  const count = data.count
  const newCount = vote === 'up' ? count + 1 : count - 1
  return await databases.updateDocument('main', 'voting', id, {
    count: newCount,
  })
}
