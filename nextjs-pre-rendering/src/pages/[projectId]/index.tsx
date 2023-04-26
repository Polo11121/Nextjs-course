import fs from "fs/promises";
import path from "path";
import { GetStaticPropsContext } from "next";

const ProjectDetails = ({ product }: { product: { title: string } }) => {
  if (!product) {
    return <p>Loading...</p>;
  }

  return <div>{product.title}</div>;
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");

  const jsonData = await fs.readFile(filePath);
  const product = JSON.parse(jsonData.toString()).products.find(
    (product: { id: string }) => product.id === params?.projectId
  );

  if (!product) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");

  const jsonData = await fs.readFile(filePath);

  const products = JSON.parse(jsonData.toString()).products;

  return {
    paths: [
      {
        params: {
          projectId: products[0].id,
        },
      },
      {
        params: {
          projectId: products[1].id,
        },
      },
    ],
    fallback: "blocking",
  };
};

export default ProjectDetails;
