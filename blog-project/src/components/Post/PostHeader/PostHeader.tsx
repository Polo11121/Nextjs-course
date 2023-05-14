import Image from "next/image";
import styles from "@/components/Post/PostHeader/PostHeader.module.css";

export const PostHeader = ({
  title,
  image,
}: {
  title: string;
  image: string;
}) => (
  <header className={styles.header}>
    <h1>{title}</h1>
    <Image src={image} alt={`${title}-post-image`} width={200} height={150} />
  </header>
);
