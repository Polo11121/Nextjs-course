import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../../../helpers/db";
import { hashPassword, verifyPassword } from "../../../../../helpers/auth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const { newPassword, oldPassword } = req.body;

  if (
    !newPassword ||
    !oldPassword ||
    newPassword.trim().length < 7 ||
    oldPassword.trim().length < 7 ||
    newPassword.trim() === oldPassword.trim()
  ) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
    return;
  }

  const { email } = session.user;

  const client = await connectToDatabase();

  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email });

  if (!user) {
    client.close();
    res.status(404).json({ message: "User not found!" });
    return;
  }

  const isValid = await verifyPassword(oldPassword, user.password);

  if (!isValid) {
    client.close();
    res.status(403).json({ message: "Invalid password." });
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email },
    { $set: { password: hashedPassword } }
  );
};

export default handler;
