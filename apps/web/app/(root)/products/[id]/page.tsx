"use client";

import React from "react";
import BreadcrumbNav from "@/components/constant/BreadcrumbNav";
import ProductSection from "@/components/showcase/ProductSection";
import { useProduct, useProducts } from "@/hooks/useStorage";
import ProductDetails from "@/components/showcase/ProductDetails";
import { getVariant } from "@/lib/utils";

function ProductDetailsPage({ params, searchParams }: PageProps) {
  const id = React.use(params)?.id || "";
  const variantId = (React.use(searchParams)?.variant as string) || "";
  const { product, isLoading, error } = useProduct(id);
  const { products } = useProducts();

  if (isLoading)
    return <div className="p-6 text-center">Loading product details...</div>;
  if (error || !product)
    return <div className="p-6 text-center">Product not found.</div>;

  const currentVariant = getVariant(product, variantId);

  return (
    <>
      <BreadcrumbNav />

      {/* Product Details */}
      <ProductDetails product={product} currentVariant={currentVariant} />

      {/* Related Products */}
      <ProductSection
        items={products}
        useCarousel={true}
        headerProps={{ subtitle: { text: "Related Products" } }}
      />
    </>
  );
}

export default ProductDetailsPage;
