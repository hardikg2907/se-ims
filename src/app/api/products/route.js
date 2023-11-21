import clientPromise from "@/utils/mongodb";

const client = await clientPromise;
const db = client.db("se-ims");
export async function GET(req, res) {
  try {
    const products = await db.collection("products").find({}).toArray();
    return Response.json(products);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" });
  }
}

export async function POST(req, res) {
  try {
    const body = await req.json();
    const result = await db.collection("products").insertOne(body);
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: "Internal Server Error" });
  }
}
