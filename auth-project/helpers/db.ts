import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.API_USER}:${process.env.API_PASSWORD}@cluster0.hq9m2ag.mongodb.net/?retryWrites=true&w=majority`
  );

  return client;
};
