export type GetProductsResponse = {
  data: {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    tags: string[];
  }[];
};

export const getProductsServerside = async () => {
  const response = await fetch("http://localhost:8000/products");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: GetProductsResponse = await response.json();

  return {
    data: data,
  };
};
