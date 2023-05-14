import Head from "next/head";
import { FeaturedPosts } from "@/components/HomePage/FeaturedPosts/FeaturedPosts";
import { Hero } from "@/components/HomePage/Hero/Hero";
import { getFeaturedPosts } from "@/helpers/postsUtil";
import { Post } from "@/helpers/types";

const HomePage = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      <Head>
        <title>NextJS Blog</title>
        <meta
          name="
        description"
          content="I post about programming and web development.
        "
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
};

export const getStaticProps = async () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 60,
  };
};

export default HomePage;
