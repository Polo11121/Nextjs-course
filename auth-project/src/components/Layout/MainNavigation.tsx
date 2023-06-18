import Link from "next/link";
import styles from "./MainNavigation.module.css";
import { useSession, signOut } from "next-auth/client";

export const MainNavigation = () => {
  const [session, loading] = useSession();

  const logoutHandler = () => signOut();

  return (
    <header className={styles.header}>
      <Link legacyBehavior href="/">
        <a>
          <div className={styles.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {session && !loading ? (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
