import { FormEvent, useEffect, useRef, useState } from "react";
import { Notification } from "@/components/UI/Notification/Notification";
import styles from "@/components/Contact/ContactForm.module.css";

const sendContactData = async (contactDetails: {
  email: string;
  name: string;
  message: string;
}) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
};

export const ContactForm = () => {
  const [requestStatus, setRequestStatus] = useState<string | null>(null);
  const [requestError, setRequestError] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const sendMessageHandler = async (event: FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailRef.current?.value;
    const enteredName = nameRef.current?.value;
    const enteredMessage = messageRef.current?.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !enteredEmail.includes("@") ||
      !enteredName ||
      enteredName.trim() === "" ||
      !enteredMessage ||
      enteredMessage.trim() === ""
    ) {
      return;
    }

    const message = {
      email: enteredEmail,
      name: enteredName,
      message: enteredMessage,
    };

    setRequestStatus("pending");

    try {
      await sendContactData(message);
    } catch (error) {
      setRequestStatus("error");
      setRequestError(
        (
          error as {
            message: string;
          }
        ).message || "Something went wrong!"
      );
    }
    emailRef.current!.value = "";
    nameRef.current!.value = "";
    messageRef.current!.value = "";

    setRequestStatus("success");
  };

  let notification: null | {
    title: string;
    message: string;
    status: string;
  } = null;

  if (requestStatus === "pending") {
    notification = {
      title: "Sending message...",
      message: "Your message is on its way!",
      status: "pending",
    };
  }
  if (requestStatus === "success") {
    notification = {
      title: "Success!",
      message: "Message sent successfully!",
      status: "success",
    };
  }
  if (requestStatus === "error") {
    notification = {
      title: "Error!",
      message: requestError,
      status: "error",
    };
  }

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  return (
    <section className={styles.contact}>
      <h1>How can I help you?</h1>
      <form onSubmit={sendMessageHandler} className={styles.form}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="email">Your Email</label>
            <input ref={emailRef} type="email" id="email" required />
          </div>
          <div className={styles.control}>
            <label htmlFor="name">Your Name</label>
            <input ref={nameRef} type="text" id="name" required />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor="message">Your Message</label>
          <textarea ref={messageRef} id="message" rows={5} required></textarea>
        </div>
        <div className={styles.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </section>
  );
};
