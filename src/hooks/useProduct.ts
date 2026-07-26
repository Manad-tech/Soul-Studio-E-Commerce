import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productStorage } from "@/utils/productStorage";

export function useProduct() {
  const { slug } = useParams();
  
  const [allProducts, setAllProducts] = useState(() => productStorage.getProducts());

  useEffect(() => {
    const handleUpdate = () => {
      setAllProducts(productStorage.getProducts());
    };
    window.addEventListener("products-updated", handleUpdate);
    return () => window.removeEventListener("products-updated", handleUpdate);
  }, []);

  const product = useMemo(
    () =>
      allProducts.find(
        (item) => item.slug === slug || (slug === "archival-portfolio-folio" && item.slug === "archival-portfolio")
      ),
    [allProducts, slug]
  );

  const relatedProducts = useMemo(
    () =>
      allProducts.filter(
        (item) =>
          item.category === product?.category &&
          item.id !== product?.id
      ),
    [allProducts, product]
  );

  return {
    product,
    relatedProducts,
  };
}