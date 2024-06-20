"use server";
import { databases } from "@/app/appwrite-server";

export async function sendBoop() {
  const data = await databases.getDocument("main", "counters", "mainBoop");
  const count = data.boop;

  return await databases.updateDocument("main", "counters", "mainBoop", {
    boop: count + 1,
  });
}
