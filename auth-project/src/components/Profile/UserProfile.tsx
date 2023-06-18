import { useRouter } from "next/router";
import { ProfileForm } from "./ProfileForm";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";

export const UserProfile = () => {
  // const router = useRouter();
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   let isMounted = true;
  //   const checkSession = async () => {
  //     const session = await getSession();

  //     if (!session && isMounted) {
  //       router.replace("/auth");
  //     }

  //     setIsLoading(false);
  //   };
  //   checkSession();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [router]);

  // if (isLoading) {
  //   return <p className={styles.profile}>Loading...</p>;
  // }

  const onChangePassword = async (newPassword: string, oldPassword: string) => {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify({ newPassword, oldPassword }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
  };

  return (
    <section className={styles.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={onChangePassword} />
    </section>
  );
};
