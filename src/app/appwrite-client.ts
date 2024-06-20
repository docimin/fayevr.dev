import { Client, Databases } from "appwrite";

export const client = new Client()
  .setEndpoint(`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/v1`)
  .setProject(`${process.env.NEXT_PUBLIC_PROJECT_ID}`);

export const databases: Databases = new Databases(client);

export { ExecutionMethod, ID, Query, AppwriteException } from "appwrite";
