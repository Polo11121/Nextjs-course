import { useRef, useState } from "react";
import { Feedback } from "@/pages/api/feedback/index";
import Link from "next/link";

const Home = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null);

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredFeedback = feedbackInputRef.current?.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    const response = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
  };

  const loadFeedbacksHandler = async () => {
    const response = await fetch("/api/feedback");
    const data = await response.json();

    setFeedbacks(data.feedback);
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input ref={emailInputRef} id="email" type="email" />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea ref={feedbackInputRef} id="feedback" rows={5} />
        </div>
        <button onClick={submitFormHandler}>Send Feedback</button>
      </form>
      <button onClick={loadFeedbacksHandler}>Load Feedbacks</button>
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback.id}>{feedback.text}</li>
        ))}
      </ul>
      <Link href="feedbacks">Show Feedbacks</Link>
    </div>
  );
};

export default Home;
