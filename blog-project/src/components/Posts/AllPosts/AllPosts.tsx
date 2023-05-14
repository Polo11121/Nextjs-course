import { PostsGrid } from "@/components/Posts/PostsGrid/PostsGrid";
import { Post } from "@/helpers/types";
import styles from "@/components/Posts/AllPosts/AllPosts.module.css";

export const AllPosts = ({ posts }: { posts: Post[] }) => (
  <section className={styles.posts}>
    <h1>All Posts</h1>
    <PostsGrid posts={posts} />
  </section>
);
