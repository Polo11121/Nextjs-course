import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export type Feedback = {
  id: string;
  email: string;
  text: string;
};

type Data = {
  message: string;
  newFeedback?: Feedback;
  feedbacks?: Feedback[];
};

const buildFeedbacksPath = () => {
  return path.join(process.cwd(), "data", "feedback.json");
};

export const extractFeedbacks = () => {
  const filePath = buildFeedbacksPath();
  const fileData = fs.readFileSync(filePath);

  return (
    fileData.toString() ? JSON.parse(fileData.toString()) : []
  ) as Feedback[];
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text: feedbackText,
    };

    const filePath = buildFeedbacksPath();

    const data = extractFeedbacks();

    data.push(newFeedback);

    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: "Success!", newFeedback });
  } else {
    const feedbacks = extractFeedbacks();

    res.status(200).json({ message: "This is a GET request", feedbacks });
  }
};

export default handler;
