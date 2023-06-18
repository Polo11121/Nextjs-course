import { useRef } from "react";
import styles from "./ProfileForm.module.css";

export const ProfileForm = ({
  onChangePassword,
}: {
  onChangePassword: (newPassword: string, oldPassword: string) => void;
}) => {
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const oldPasswordRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordRef.current!.value;
    const enteredOldPassword = oldPasswordRef.current!.value;

    if (
      !enteredNewPassword ||
      !enteredOldPassword ||
      enteredNewPassword.trim().length < 7 ||
      enteredOldPassword.trim().length < 7 ||
      enteredNewPassword.trim() === enteredOldPassword.trim()
    ) {
      return;
    }

    onChangePassword(enteredNewPassword, enteredOldPassword);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" />
      </div>
      <div className={styles.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" />
      </div>
      <div className={styles.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};
