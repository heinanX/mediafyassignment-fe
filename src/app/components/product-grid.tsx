"use client";

import { useCallback, useMemo, useState } from "react";
import { GetProductsResponse } from "../api/getProducts";
import TagsMenu from "./tags-menu";

import MemoizedProductCard from "./product-card";

const ProductGrid = ({ productData }: { productData: GetProductsResponse }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    console.log("setting tags");
    return [...new Set(productData.data.map((product) => product.tags).flat())];
  }, [productData]);

  const products = useMemo(() => {
    console.log("filtering products");
    return productData.data.filter((product) => {
      if (!selectedTag) {
        return true;
      }
      return product.tags.includes(selectedTag);
    });
  }, [productData, selectedTag]);

  const handleSelect = useCallback(
    (product: GetProductsResponse["data"][0]) => {
      setSelectedId(product.id);
    },
    []
  );

  return (
    <>
      <section className="my-5">
        <TagsMenu
          tags={tags}
          onSelect={(tag) => setSelectedTag(tag)}
          selectedTag={selectedTag}
        />
      </section>
      <section className="w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center justify-center gap-14 mt-10 mb-5">
        {products.map((product) => (
          <MemoizedProductCard
            key={product.id}
            product={product}
            isSelected={product.id === selectedId}
            onSelect={handleSelect}
          />
        ))}
      </section>
    </>
  );
};

export default ProductGrid;
