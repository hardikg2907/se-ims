import { ObjectId } from "mongodb";
import clientPromise from "@/utils/mongodb";

const client = await clientPromise;
const db = client.db("se-ims");

export async function GET(req, res) {
  try {
    const vendors = await db.collection("vendors").find({}).toArray();
    return Response.json(vendors);
  } catch (error) {
    return Response.json({ error: "Internal Server Error" });
  }
}

export async function POST(req, res) {
  try {
    const { name, contactInfo, address } = await req.json();
    const supplier = { name, contactInfo, address };
    const result = await db.collection("vendors").insertOne(supplier);
    return Response.json(result.ops[0]);
  } catch (error) {
    return Response.json({ error: "Internal Server Error" });
  }
}

// export default async function handler(req, res) {
//   const { method } = req;

//   const { db } = await connectToDatabase();

//   switch (method) {
//     case "GET":
//       break;

//     case "POST":

//       break;

//     case "PUT":
//       try {
//         const { id } = req.query;
//         const { name, contactInfo, address } = req.body;

//         if (!id || !name || !contactInfo || !address) {
//           return res.status(400).json({
//             error: "Supplier ID, name, contactInfo, and address are required.",
//           });
//         }

//         const result = await db
//           .collection("vendors")
//           .updateOne(
//             { _id: ObjectId(id) },
//             { $set: { name, contactInfo, address } }
//           );

//         if (result.matchedCount === 0) {
//           return res.status(404).json({ error: "Supplier not found." });
//         }

//         return res.status(200).json({ success: true });
//       } catch (error) {
//         return res.status(500).json({ error: "Internal Server Error" });
//       }
//       break;

//     case "DELETE":
//       try {
//         const { id } = req.query;
//         if (!id) {
//           return res
//             .status(400)
//             .json({ error: "Supplier ID is required for deletion." });
//         }

//         const result = await db
//           .collection("vendors")
//           .deleteOne({ _id: ObjectId(id) });
//         if (result.deletedCount === 1) {
//           return res.status(200).json({ success: true });
//         } else {
//           return res.status(404).json({ error: "Supplier not found." });
//         }
//       } catch (error) {
//         return res.status(500).json({ error: "Internal Server Error" });
//       }
//       break;

//     default:
//       res.status(405).json({ error: "Method Not Allowed" });
//       break;
//   }
// }
