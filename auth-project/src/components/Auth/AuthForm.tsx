import { FormEvent, useRef, useState } from "react";
import { signIn } from "next-auth/client";
import styles from "./AuthForm.module.css";
import { useRouter } from "next/router";

const createUser = async (email: string, password: string) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
};

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const switchAuthModeHandler = () => setIsLogin((prevState) => !prevState);

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailValue = emailRef?.current?.value;
    const passwordValue = passwordRef?.current?.value;
    if (
      !emailValue ||
      emailValue.trim() === "" ||
      !emailValue.includes("@") ||
      !passwordValue ||
      passwordValue.trim() === "" ||
      passwordValue.trim().length < 7
    ) {
      return;
    }

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: emailValue,
        password: passwordValue,
      });

      if (result && !result.error) {
        // set some auth state
      }

      router.replace("/profile");
    } else {
      try {
        const result = await createUser(emailValue, passwordValue);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className={styles.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailRef} type="email" id="email" required />
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={passwordRef} type="password" id="password" required />
        </div>
        <div className={styles.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={styles.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};
