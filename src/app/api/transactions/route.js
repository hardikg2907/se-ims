import clientPromise from "@/utils/mongodb";
import { ObjectId } from "mongodb";

const client = await clientPromise;
const db = client.db("se-ims");

export async function GET(req, res) {
  try {
    let transactions = await db.collection("transactions").find({}).toArray();
    const updatedTransactions = [];
    for (const transaction of transactions) {
      const product = await db
        .collection("products")
        .findOne({ _id: new ObjectId(transaction.productId) });

      updatedTransactions.push({ ...transaction, product });
    }
    return Response.json(updatedTransactions);
  } catch (error) {
    return Response.json({ error: "Internal Server Error" });
  }
}

export async function POST(req, res) {
  try {
    const { type, quantity, productId } = await req.json();
    const transaction = { type, quantity, productId, timestamp: new Date() };

    // Update product stock based on transaction type
    if (type === "stock-in") {
      await db
        .collection("products")
        .updateOne(
          { _id: new ObjectId(productId) },
          { $inc: { quantity: quantity } }
        );
    } else if (type === "stock-out") {
      const product = await db
        .collection("products")
        .findOne({ _id: new ObjectId(productId) });

      if (!product || product.quantity < quantity) {
        return Response.json({ error: "Insufficient stock" });
      }

      await db
        .collection("products")
        .updateOne(
          { _id: new ObjectId(productId) },
          { $inc: { quantity: -quantity } }
        );
    }

    const result = await db.collection("transactions").insertOne(transaction);
    return Response.json(result);
  } catch (error) {
    console.error("Error creating transaction:", error);
    return Response.json({ error: "Internal Server Error" });
  }
}
