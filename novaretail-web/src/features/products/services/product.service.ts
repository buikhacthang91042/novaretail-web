import { apiClient } from "@/src/shared/lib/api-client";
import { GetProductQuery, GetProductResponse } from "../types/product.types";

export async function getProductList(
  query: GetProductQuery
): Promise<GetProductResponse> {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });
  const response = await apiClient(`/api/v1/products?${params.toString()}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(`Get Product List Failed (${response.status}) !`);
  }
  const json = (await response.json()) as GetProductResponse;
  return json;
}
