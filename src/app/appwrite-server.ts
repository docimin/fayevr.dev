import { Client, Databases, Storage } from 'node-appwrite'

export const client = new Client()
  .setEndpoint(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/v1`)
  .setProject(`${process.env.NEXT_PUBLIC_PROJECT_ID}`)
  .setKey(`${process.env.API_KEY}`)

export const databases: Databases = new Databases(client)
export const storage: Storage = new Storage(client)

export { ExecutionMethod, ID, Query, AppwriteException } from 'node-appwrite'
