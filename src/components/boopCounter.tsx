'use client'
import { Button } from '@/components/ui/button'
import { sendBoop } from '@/lib/actions/sendBoop'
import { client } from '@/app/appwrite-client'
import { useEffect, useState } from 'react'
import { BoopRealtimeCounter } from '@/lib/types/counters'
import { getBoops } from '@/lib/server-calls'

export default function BoopCounter() {
  const [boopCount, setBoopCount] = useState<number>(null)

  useEffect(() => {
    const getBoopCount = async () => {
      const data = await getBoops()
      setBoopCount(data)
    }
    getBoopCount().then()
  }, [])

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
      {boopCount === null ? (
        <svg
          className="mr-3 -ml-1 size-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <Button onClick={handleSubmit}>{boopCount}</Button>
      )}
    </div>
  )
}
