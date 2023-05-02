import { NextApiRequest, NextApiResponse } from "next";
import { buildPath, extractFile } from "@/helpers/files";
import fs from "fs";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    try {
      const fileName = "newsletter";

      const filePath = buildPath(fileName);

      const data = extractFile(fileName);

      data.push({
        id: new Date().toISOString(),
        email,
      });

      fs.writeFileSync(filePath, JSON.stringify(data));
    } catch (err) {
      res.status(500).json({ message: "Failed to store data." });
      return;
    }

    res.status(201).json({ message: "Signed up!" });
  }
  return;
};

export default handler;
