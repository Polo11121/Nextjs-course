type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

const Products = ({ products }: { products: Product[] }) => {
  if (!products) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = async () => {
  const response = await fetch("https://dummyjson.com/products");

  const data = await response.json();

  return {
    props: {
      products: data.products,
    },
  };
};

export default Products;
