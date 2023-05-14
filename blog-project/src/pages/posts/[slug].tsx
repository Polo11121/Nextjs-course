import Head from "next/head";
import { PostContent } from "@/components/Post/PostContent/PostContent";
import { getPostData, getPostsFiles } from "@/helpers/postsUtil";
import { Post } from "@/helpers/types";
import { GetStaticPropsContext } from "next";

const PostPage = ({ post }: { post: Post }) => (
  <>
    <Head>
      <title>{post.title}</title>
      <meta name="description" content={post.description} />
    </Head>
    <PostContent post={post} />;
  </>
);

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;

  const post = getPostData(params?.slug as string);
  return {
    props: {
      post,
    },
    revalidate: 600,
  };
};

export const getStaticPaths = async () => {
  const posts = getPostsFiles();

  return {
    paths: posts.map((post) => ({
      params: { slug: post.replace(/\.md$/, "") },
    })),
    fallback: "blocking",
  };
};

export default PostPage;
