import { ObjectId } from 'mongodb';
import connectToDatabase from './connectDb';

// Name of your database
const dbName = process.env.MONGODB_DB;


// Function to fetch all travel plans
export const getAllTravelPlans = async () => {
  try {
    await client.connect();

    // Fetch all plans from the 'travelPlans' collection in your MongoDB Atlas database
    const result = await client.db("Wayfarer").collection("plans").find().toArray();

    return result;
  } finally {
    await client.close();
  }
};

// Function to add a new travel plan
export const addTravelPlan = async (plan) => {
  const db = await connectToDatabase(process.env.MONGODB_URI);

  // Insert the plan object into the 'travelPlans' collection in your MongoDB Atlas database
  const result = await db.db(dbName).collection("travelPlans").insertOne(plan);

  return result.ops[0]; // Return the inserted plan
};

// Function to get a travel plan by its id
export const getTravelPlan = async (id) => {
  const db = await connectToDatabase(process.env.MONGODB_URI);

  // Fetch the plan with the provided id from the 'travelPlans' collection in your MongoDB Atlas database
  const result = await db.db(dbName).collection("travelPlans").findOne({ _id: ObjectId(id) });

  return result;
};

// Function to update an existing travel plan
export const updateTravelPlan = async (id, newPlan) => {
  const db = await connectToDatabase(process.env.MONGODB_URI);

  const result = await db
    .db(dbName)
    .collection("travelPlans")
    .updateOne({ _id: ObjectId(id) }, { $set: newPlan });

  return result;
};

// Function to delete a travel plan
export const deleteTravelPlan = async (id) => {
  const db = await connectToDatabase(process.env.MONGODB_URI);

  const result = await db
    .db(dbName)
    .collection("travelPlans")
    .deleteOne({ _id: ObjectId(id) });

  return result;
};