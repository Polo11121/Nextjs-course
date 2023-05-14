import { AllPosts } from "@/components/Posts/AllPosts/AllPosts";
import { getAllPosts } from "@/helpers/postsUtil";
import { Post } from "@/helpers/types";
import Head from "next/head";

const AllPostsPage = ({ posts }: { posts: Post[] }) => (
  <>
    <Head>
      <title>All Posts</title>
      <meta
        name="description"
        content="A list of all programming-related tutorials and posts!"
      />
    </Head>
    <AllPosts posts={posts} />;
  </>
);

export const getStaticProps = async () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
    revalidate: 60,
  };
};

export default AllPostsPage;
