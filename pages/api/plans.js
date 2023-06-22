import connectToDatabase from '../../lib/connectDb';
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === 'GET') {
    const { id } = req.query;

    // If id is provided, find the specific plan. Otherwise, return all plans.
    if (id) {
      const plan = await db.collection("plans").findOne({ _id: new ObjectId(id) });
      return res.json(plan);
    } else {
      const plans = await db.collection("plans").find({}).toArray();
      return res.json(plans);
    }
  }
}
