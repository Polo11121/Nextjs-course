import { useState } from "react";
import { Feedback, extractFeedbacks } from "@/pages/api/feedback";

const Feedbacks = ({ feedbacks }: { feedbacks: Feedback[] }) => {
  const [feedbackInfo, setFeedbackInfo] = useState<Feedback>({
    id: "",
    email: "",
    text: "",
  });

  const loadFeedbackInfoHandler = async (id: string) => {
    const response = await fetch(`/api/feedback/${id}`);
    const data = await response.json();

    setFeedbackInfo(data.feedback);
  };

  return (
    <div>
      <h1>Feedbacks</h1>
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback.id}>
            {feedback.text}{" "}
            <button onClick={() => loadFeedbackInfoHandler(feedback.id)}>
              Show Details
            </button>
            {feedbackInfo.id === feedback.id && (
              <p>
                {feedbackInfo.email} {feedbackInfo.text}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = async () => {
  const feedbacks = extractFeedbacks();

  return {
    props: {
      feedbacks,
    },
    revalidate: 90,
  };
};

export default Feedbacks;
