'use server'
import { databases } from '@/app/appwrite-server'

let lastBoopTime = 0
const cooldown = 200 // cooldown period in milliseconds

export async function sendBoop() {
  const now = Date.now()
  if (now < lastBoopTime + cooldown) {
    // If it's too soon to send another boop, return without doing anything
    return
  }

  const data = await databases.getDocument('main', 'counters', 'mainBoop')
  const count = data.boop

  lastBoopTime = now // update the last boop time

  return await databases.updateDocument('main', 'counters', 'mainBoop', {
    boop: count + 1,
  })
}
