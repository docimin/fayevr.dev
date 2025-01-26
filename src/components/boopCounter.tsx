'use client'
import { Button } from '@/components/ui/button'
import { sendBoop } from '@/lib/actions/sendBoop'
import { client } from '@/app/appwrite-client'
import { useEffect, useState } from 'react'
import { BoopRealtimeCounter } from '@/lib/types/counters'

export default function BoopCounter({ count }: { count: number }) {
  const [boopCount, setBoopCount] = useState<number>(count)

  async function handleSubmit() {
    await sendBoop()
  }

  useEffect(() => {
    const subscription = client.subscribe(
      'databases.main.collections.counters.documents.mainBoop',
      (response: BoopRealtimeCounter) => {
        setBoopCount(response.payload.boop)
      }
    )
    return () => {
      subscription()
    }
  }, [])

  return (
    <div className={'text-center'}>
      <h2 className={'mb-2'}>Boop Counter</h2>
      <Button onClick={handleSubmit}>{boopCount}</Button>
    </div>
  )
}
