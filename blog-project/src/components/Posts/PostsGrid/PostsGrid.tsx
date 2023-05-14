import { PostItem } from "@/components/Posts/PostsGrid/PostItem/PostItem";
import { Post } from "@/helpers/types";
import styles from "@/components/Posts/PostsGrid/PostsGrid.module.css";

export const PostsGrid = ({ posts }: { posts: Post[] }) => (
  <ul className={styles.grid}>
    {posts.map((post) => (
      <PostItem key={post.slug} {...post} />
    ))}
  </ul>
);
