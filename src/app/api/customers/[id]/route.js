import { ObjectId } from "mongodb";
import clientPromise from "@/utils/mongodb";

const client = await clientPromise;
const db = client.db("se-ims");

export async function DELETE(req, { params }) {
  try {
    let id = params.id;
    id = typeof id === "string" ? new ObjectId(id) : id;
    if (!id) {
      return Response.json({ error: "Customer ID is required for deletion." });
    }

    const result = await db.collection("customers").deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      return Response.json({ success: true });
    } else {
      return Response.json({ error: "Customer not found." });
    }
  } catch (error) {
    return Response.json({ error: "Internal Server Error" });
  }
}
