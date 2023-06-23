import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  try {
    await client.connect();

    const db = client.db(process.env.MONGODB_DB);

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
    } else if (req.method === 'POST') {
      const plan = req.body;

      // Insert the plan into the 'plans' collection
      const result = await db.collection("plans").insertOne(plan);
      const savedPlan = result.ops[0];

      return res.status(201).json(savedPlan);
    }
  } finally {
    // Ensuring that the client will close when you finish/error
    await client.close();
  }
}
