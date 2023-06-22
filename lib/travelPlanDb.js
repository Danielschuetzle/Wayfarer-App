import { MongoClient, ObjectId } from 'mongodb';

// Connection URL to your MongoDB Atlas database
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Function to add a new travel plan
export const addTravelPlan = async (plan) => {
  try {
    await client.connect(); // Connect to the MongoDB client

    // Insert the plan object into the 'travelPlans' collection in your MongoDB Atlas database
    const result = await client.db("TravelApp").collection("travelPlans").insertOne(plan);

    return result; // Return the result of the insertion
  } finally {
    await client.close(); // Ensure to close the connection after the operation is complete
  }
};

// Function to get a travel plan by its id
export const getTravelPlan = async (id) => {
  try {
    await client.connect();

    // Fetch the plan with the provided id from the 'travelPlans' collection in your MongoDB Atlas database
    const result = await client.db("TravelApp").collection("travelPlans").findOne({ _id: ObjectId(id) });

    return result;
  } finally {
    await client.close();
  }
};

// Function to update an existing travel plan
export const updateTravelPlan = async (id, newPlan) => {
  try {
    await client.connect();

    const result = await client
      .db("TravelApp")
      .collection("travelPlans")
      .updateOne({ _id: ObjectId(id) }, { $set: newPlan });

    return result;
  } finally {
    await client.close();
  }
};

// Function to delete a travel plan
export const deleteTravelPlan = async (id) => {
  try {
    await client.connect();

    const result = await client
      .db("TravelApp")
      .collection("travelPlans")
      .deleteOne({ _id: ObjectId(id) });

    return result;
  } finally {
    await client.close();
  }
};
