import { ObjectId } from "mongodb";
import clientPromise from "@/utils/mongodb";

const client = await clientPromise;
const db = client.db("se-ims");
export async function GET(req, res) {
  try {
    const customers = await db.collection("customers").find({}).toArray();
    return Response.json(customers);
  } catch (error) {
    return Response.json({ error: "Internal Server Error" });
  }
}

export async function POST(req, res) {
  try {
    const { name, contactInfo, address } = await req.json();
    const customer = { name, contactInfo, address };
    const result = await db.collection("customers").insertOne(customer);
    return Response.json(result.ops[0]);
  } catch (error) {
    return Response.json({ error: "Internal Server Error" });
  }
}
