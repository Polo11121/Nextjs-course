import { NextApiRequest, NextApiResponse } from "next";
import { extractFeedbacks, Feedback } from "@/pages/api/feedback/index";

type Data = {
  feedback: Feedback;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const selectedId = req.query.id;
  const feedbacks = extractFeedbacks();

  const selectedFeedback = feedbacks.find(
    (feedback) => feedback.id === selectedId
  ) as Feedback;

  res.status(200).json({ feedback: selectedFeedback });
};

export default handler;
