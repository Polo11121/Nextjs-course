import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, message, name } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input" });
      return;
    }

    const newMessage: {
      email: string;
      message: string;
      name: string;
      id?: ObjectId;
    } = {
      email,
      message,
      name,
    };

    let client;

    try {
      client = await MongoClient.connect(
        `mongodb+srv://${process.env.API_USER}:${process.env.API_PASSWORD}@cluster0.hq9m2ag.mongodb.net/?retryWrites=true&w=majority`
      );
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database" });
      return;
    }

    try {
      const result = await client
        .db()
        .collection("messages")
        .insertOne(newMessage);

      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();

      res.status(500).json({ message: "Storing message failed!" });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: "Successfully stored message!", newMessage });
  }
};

export default handler;
