import Image from "next/image";
import styles from "@/components/HomePage/Hero/Hero.module.css";

export const Hero = () => (
  <section className={styles.hero}>
    <div className={styles.image}>
      <Image
        src="/images/site/michal.jpg"
        alt="An image showing Michał"
        width={300}
        height={300}
      />
    </div>
    <h1>Hi, I`m Michał</h1>
    <p>
      I blog about web development - especially frontend frameworks like Angular
      or React.
    </p>
  </section>
);
