import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.API_USER}:${process.env.API_PASSWORD}@cluster0.hq9m2ag.mongodb.net/?retryWrites=true&w=majority`
  );

  const db = client.db();

  const result = await db.collection("meetups").insertOne(data);

  client.close();

  res.status(201).json({ message: "Meetup inserted!", result });
};

export default handler;
