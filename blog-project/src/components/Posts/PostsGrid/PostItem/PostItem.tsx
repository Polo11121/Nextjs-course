import { Post } from "@/helpers/types";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/Posts/PostsGrid/PostItem/PostItem.module.css";

type PostItemProps = Post;

export const PostItem = ({
  title,
  date,
  image,
  description,
  slug,
}: PostItemProps) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imagePath = `/images/posts/${slug}/${image}`;

  return (
    <li className={styles.post}>
      <Link href={`/posts/${slug}`} legacyBehavior>
        <a>
          <div className={styles.image}>
            <Image
              src={imagePath}
              alt={`${title}-post-image`}
              width={300}
              height={200}
            />
          </div>
          <div className={styles.content}>
            <h3>{title}</h3>
            <time>{formattedDate}</time>
            <p>{description}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};
