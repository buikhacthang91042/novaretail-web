"use client";
import { useCallback, useEffect, useState } from "react";
import { GetProductQuery, GetProductResponse } from "../types/product.types";
import { getProductList } from "../services/product.service";
import ProductTable from "./product-table";
import ProductFilter from "./product-filter";
import { GetBrandsResponse } from "../../brands/types/brand.types";
import { GetCategoriesResponse } from "../../categories/types/categories.type";
import { getBrandList } from "../../brands/services/brand.service";
import { getCategoryList } from "../../categories/services/categories.service";

function ProductList() {
  const [productList, setProductList] = useState<GetProductResponse>();
  const [brandList, setBrandList] = useState<GetBrandsResponse>({
    data: [],
  });
  const [filters, setFilters] = useState({
    search: "",
    status: "" as "" | "ACTIVE" | "INACTIVE" | "ARCHIVED",
    brandId: "",
    categoryId: "",
  });
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);
  const [brandError, setBrandError] = useState("");
  const [brandLoading, setBrandLoading] = useState(true);
  const [categoryList, setCategoryList] = useState<GetCategoriesResponse>({
    data: [],
  });
  const [categoryError, setCategoryError] = useState("");
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchProducts = useCallback(
    async (filters: GetProductQuery, signal: AbortSignal) => {
      console.log("fetchProducts called:", filters);
      setLoading(true);
      setError("");
      try {
        const res = await getProductList(filters, signal);
        setProductList(res);
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        if (!signal?.aborted) setLoading(false);
      }
    },
    [],
  );

  const fetchBrands = useCallback(async () => {
    setBrandLoading(true);
    setBrandError("");
    try {
      const res = await getBrandList();
      setBrandList(res);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setBrandError(error.message);
      } else {
        setBrandError("An unexpected error occurred.");
      }
    } finally {
      setBrandLoading(false);
    }
  }, []);
  const fetchCategory = useCallback(async () => {
    setCategoryLoading(true);
    setCategoryError("");
    try {
      const res = await getCategoryList();
      setCategoryList(res);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setCategoryError(error.message);
      } else {
        setCategoryError("An unexpected error occurred.");
      }
    } finally {
      setCategoryLoading(false);
    }
  }, []);

  const handleFilterChange = useCallback((patch: Partial<typeof filters>) => {
    setFilters((prev) => ({
      ...prev,
      ...patch,
    }));
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    fetchProducts(
      {
        search: debouncedSearch,
        status: filters.status,
        brandId: filters.brandId,
        categoryId: filters.categoryId,
      },
      ac.signal,
    );
    return () => ac.abort();
  }, [
    debouncedSearch,
    filters.status,
    filters.brandId,
    filters.categoryId,
    fetchProducts,
  ]);

  useEffect(() => {
    fetchBrands();
    fetchCategory();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(filters.search), 1000);
    return () => clearTimeout(timer);
  }, [filters.search]);

  return (
    <div>
      <div className="flex flex-col p-10 gap-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold ">Products</h1>
            <p className="text-gray-600 text-md">Manage your product catalog</p>
          </div>
          <div>
            <p className="flex items-center justify-center px-3 py-1 font-semibold text-sm rounded-full bg-gray-100">
              {productList?.meta.total ?? 0}{" "}
              {(productList?.meta.total ?? 0) > 0 ? "products" : "product"}
            </p>
          </div>
        </div>
        <ProductFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          brandList={brandList}
          brandLoading={brandLoading}
          brandError={brandError}
          categoryList={categoryList}
          categoryLoading={categoryLoading}
          categoryError={categoryError}
        />
        <div>
          {loading ? (
            <div className="animate-spin">Loading...</div>
          ) : error.length ? (
            <div className="text-red-600">{error}</div>
          ) : !productList ? (
            <div className="text-red-600">Can not get product list</div>
          ) : productList.data.length === 0 ? (
            <div>No data available</div>
          ) : (
            <ProductTable productsList={productList.data} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
