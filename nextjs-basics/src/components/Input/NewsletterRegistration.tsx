import { FormEvent, useRef } from "react";
import styles from "@/components/Input/NewsletterRegistration.module.css";

export const NewsletterRegistration = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const registrationHandler = async (event: FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailRef.current!.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !enteredEmail.includes("@")
    ) {
      return;
    }

    await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    emailRef.current!.value = "";
  };

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            ref={emailRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};
