import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../../helpers/db";
import { hashPassword } from "../../../../../helpers/auth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return;
  }

  const { email, password } = req.body;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long!",
    });

    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email });

  if (existingUser) {
    res.status(422).json({
      message: "User exists already!",
    });

    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "Created user!",
  });

  client.close();
  return;
};

export default handler;
