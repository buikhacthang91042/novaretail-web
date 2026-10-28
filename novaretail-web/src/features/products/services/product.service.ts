import { apiClient } from "@/src/shared/lib/api-client";
import {
  CreateProductPayload,
  CreateProductResponse,
  GetProductQuery,
  GetProductResponse,
} from "../types/product.types";

export async function getProductList(
  query: GetProductQuery,
  signal?: AbortSignal,
): Promise<GetProductResponse> {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });
  const response = await apiClient(`/api/v1/products?${params.toString()}`, {
    method: "GET",
    signal,
  });
  if (!response.ok) {
    throw new Error(`Get Product List Failed (${response.status}) !`);
  }
  const json = (await response.json()) as GetProductResponse;
  return json;
}

export async function createProduct(
  body: CreateProductPayload,
): Promise<CreateProductResponse> {
  const response = await apiClient("/api/v1/products", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message =
      errorData?.message ?? `Create New Product Failed (${response.status}) !`;
    throw new Error(Array.isArray(message) ? message.join(", ") : message);
  }
  const json = (await response.json()) as CreateProductResponse;
  return json;
}
