import { MongoClient } from 'mongodb';

const dbName = process.env.MONGODB_DB;

let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = client.db(dbName);
  cachedDb = db;
  return db;
}

export default connectToDatabase;
