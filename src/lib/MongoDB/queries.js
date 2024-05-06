import { client } from "./connector";
import { ObjectId } from "mongodb";

const database = process.env.MONGODB_DB;

// function to get all the documents from the collection
export const getAllEntries = async (
  collectionName
) => {
  const db = client.db(database);
  const collection = db.collection(collectionName);
  const res = await collection.find().toArray();

  return res;
};

// function to get a document from the collection
export const getEntry = async (collectionName, docId) => {
  const db = client.db(database);
  const collection = db.collection(collectionName);
  const result = await collection.findOne({
    _id: new ObjectId(docId),
  });
  return result;
};

// function to insert a document into the collection
export const insertEntry = async (collectionName, data) => {
  const db = client.db(database);
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(data);
  return result;
};