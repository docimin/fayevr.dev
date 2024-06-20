import { Models } from "node-appwrite";
import { RealtimeResponseEvent } from "appwrite";

export interface BoopRealtimeCounter extends RealtimeResponseEvent<any> {
  payload: BoopCounter;
}

interface BoopCounter extends Models.Document {
  boop: number;
}
