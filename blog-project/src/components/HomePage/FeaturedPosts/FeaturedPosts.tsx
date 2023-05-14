import { PostsGrid } from "@/components/Posts/PostsGrid/PostsGrid";
import { Post } from "@/helpers/types";
import styles from "@/components/HomePage/FeaturedPosts/FeaturedPosts.module.css";

export const FeaturedPosts = ({ posts }: { posts: Post[] }) => (
  <section className={styles.latest}>
    <h2>FeaturedPosts</h2>
    <PostsGrid posts={posts} />
  </section>
);
