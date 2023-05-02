import { NextApiRequest, NextApiResponse } from "next";
import { buildPath, extractFile } from "@/helpers/files";
import { Comment } from "@/helpers/types";
import fs from "fs";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { eventId } = req.query;
  const fileName = "comments";

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    console.log(email, name, text);

    const newComment = {
      commentId: new Date().toISOString(),
      eventId,
      email,
      name,
      text,
    };

    try {
      const filePath = buildPath(fileName);

      const data = extractFile(fileName);

      data.push(newComment);

      fs.writeFileSync(filePath, JSON.stringify(data));
    } catch (err) {
      res.status(500).json({ message: "Failed to store data." });
      return;
    }

    res.status(201).json({ message: "Added comment.", comment: newComment });
  }

  if (req.method === "GET") {
    try {
      const data = extractFile(fileName) as Comment[];

      const comments = data.filter((comment) => comment.eventId === eventId);

      res.status(200).json({ comments });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch data." });
      return;
    }
  }
};

export default handler;
