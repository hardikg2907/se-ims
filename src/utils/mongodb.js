import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!process.env.MONGODB_URI) {
  throw new Error("Add Mongo URI to .env.local");
}

let clientPromise =
  process.env.NODE_ENV === "development"
    ? global._mongoClientPromise ||
      (global._mongoClientPromise = new MongoClient(uri, options).connect())
    : new MongoClient(uri, options).connect();

export default clientPromise;
