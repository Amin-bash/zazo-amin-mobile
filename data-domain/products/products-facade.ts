import { useState, useEffect } from "react";
import { getProducts } from "./products-services";
import { Product } from "./products.models";

export const useProductFacade = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 5;

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
      setVisibleProducts(data.slice(0, ITEMS_PER_PAGE));
    } catch (err) {
      setError("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (category : string) => {
    if (category) {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
      setVisibleProducts(filtered.slice(0, ITEMS_PER_PAGE));
    } else {
      setFilteredProducts(products);
      setVisibleProducts(products.slice(0, ITEMS_PER_PAGE));
    }
  };

  const loadMoreProducts = (page : number) => {
    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    if (start < filteredProducts.length) {
      setVisibleProducts((prev) => [
        ...prev,
        ...filteredProducts.slice(start, end),
      ]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    filteredProducts,
    visibleProducts,
    loading,
    error,
    fetchProducts,
    applyFilter,
    loadMoreProducts,
  };
};
