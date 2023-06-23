import { MongoClient, ObjectId } from 'mongodb';
import connectToDatabase from './connectDb';

const collectionName = 'travelPlans';

// Function to fetch all travel plans
export const getPlans = async () => {
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const result = await db.collection(collectionName).find().toArray();
  return result;
};

// Function to add a new travel plan
export const createPlan = async (plan) => {
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const result = await db.collection(collectionName).insertOne(plan);
  return result.ops[0];
};


// Function to get a travel plan by its id
export const getTravelPlan = async (id) => {
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const result = await db.collection(collectionName).findOne({ _id: ObjectId(id) });
  return result;
};

// Function to update an existing travel plan
export const updateTravelPlan = async (id, newPlan) => {
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const result = await db.collection(collectionName).updateOne({ _id: ObjectId(id) }, { $set: newPlan });
  return result;
};


// Function to delete a travel plan
export const deleteTravelPlan = async (id) => {
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const result = await db.collection(collectionName).deleteOne({ _id: ObjectId(id) });
  return result;
};
