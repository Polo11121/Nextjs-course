import fs from "fs/promises";
import Link from "next/link";
import path from "path";

const HomePage = ({
  products,
}: {
  products: { id: string; title: string }[];
}) => (
  <ul>
    {products.map((product) => (
      <Link key={product.id} href={product.id}>
        <li>{product.title}</li>
      </Link>
    ))}
    <Link href="user-profile">user-profile</Link>{" "}
    <Link href="products">products</Link>
  </ul>
);

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");

  const jsonData = await fs.readFile(filePath);
  const products = JSON.parse(jsonData.toString()).products;

  if (!products) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (products.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products,
    },
  };
};

export default HomePage;
