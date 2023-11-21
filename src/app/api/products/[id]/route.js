import clientPromise from "@/utils/mongodb";
import { ObjectId } from "mongodb";

const client = await clientPromise;
const db = client.db("se-ims");
export async function DELETE(req, { params }) {
  let id = params.id;
  id = typeof id === "string" ? new ObjectId(id) : id;
  try {
    const product = await db.collection("products").deleteOne({ _id: id });
    return Response.json({ product });
  } catch (error) {
    // console.log(error);
    return Response.json({ error: "Internal Server Error" });
  }
}
