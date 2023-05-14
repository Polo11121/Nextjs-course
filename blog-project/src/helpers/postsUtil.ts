import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { Post } from "./types";

const contentDirectory = path.join(process.cwd(), "content");

export const getPostsFiles = () => fs.readdirSync(contentDirectory);

export const getPostData = (postIdentifier: string) => {
  const postSlug = postIdentifier.replace(/\.md$/, "");
  const pathFile = path.join(contentDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(pathFile, "utf-8");

  const { data, content } = matter(fileContent);

  return {
    ...(data as Post),
    content,
    slug: postSlug,
  };
};

export const getAllPosts = () => {
  const allPosts = fs
    .readdirSync(contentDirectory)
    .map((fileName) => getPostData(fileName))
    .sort((postA, postB) => (postA.date > postB.date ? -1 : 1));

  return allPosts;
};

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
};
