"use client";
import React, { useEffect, useState } from "react";
import { GetProductResponse } from "../types/product.types";
import { getProductList } from "../services/product.service";

function ProductList() {
  const [productList, setProductList] = useState<GetProductResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getProductList({});
        setProductList(res);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  if (loading) {
    return <div className="animate-spin">Loading...</div>;
  }
  if (!productList) {
    return <div>No data available</div>;
  }
  if (error.length) {
    return <div className="text-red-600">{error}</div>;
  }
  return (
    <div>
      {productList.data.length === 0 ? (
        <div>No data available</div>
      ) : (
        <div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-3 py-4 ">Name</th>
                <th className="px-3 py-4 ">Code</th>
                <th className="px-3 py-4 ">Brand</th>
                <th className="px-3 py-4 ">Category</th>
                <th className="px-3 py-4 ">Variant Count</th>
                <th className="px-3 py-4 ">Status</th>
              </tr>
            </thead>
            <tbody>
              {productList?.data.map((product) => (
                <tr key={product.id}>
                  <td className="px-3 py-4 ">{product.name}</td>
                  <td className="px-3 py-4 ">{product.code}</td>
                  <td className="px-3 py-4 ">{product.brand.name}</td>
                  <td className="px-3 py-4 ">{product.category.name}</td>
                  <td className="px-3 py-4 ">{product.variantCount}</td>
                  <td className="px-3 py-4 ">{product.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProductList;
