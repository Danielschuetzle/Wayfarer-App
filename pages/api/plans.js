import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { db } = await connectToDatabase();
    const { name, startDate, endDate, activities } = req.body;
    
    const result = await db.collection("travelplans").insertOne({
      name, startDate, endDate, activities
    });

    return res.json(result);
  }
}
