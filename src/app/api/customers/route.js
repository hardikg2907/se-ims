// pages/api/customers.js
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/utils/mongodb";

export default async function handler(req, res) {
  const { method } = req;

  const { db } = await connectToDatabase();

  switch (method) {
    case "GET":
      try {
        const customers = await db.collection("customers").find({}).toArray();
        res.status(200).json(customers);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "POST":
      try {
        const { name, contactInfo, address } = req.body;
        const customer = { name, contactInfo, address };
        const result = await db.collection("customers").insertOne(customer);
        res.status(201).json(result.ops[0]);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    // Add additional CRUD operations as needed

    default:
      res.status(405).json({ error: "Method Not Allowed" });
      break;
  }
}
