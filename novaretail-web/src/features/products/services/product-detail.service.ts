import { apiClient } from "@/src/shared/lib/api-client";
import {
  DeleteProductDetailResponse,
  GetProductDetailResponse,
  UpdateProductDetailRequest,
  UpdateProductDetailResponse,
} from "../types/product.detail.type";

export async function getProductDetail(
  id: string,
  signal?: AbortSignal,
): Promise<GetProductDetailResponse> {
  const response = await apiClient(`/api/v1/products/${id}`, {
    method: "GET",
    signal,
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message =
      errorData.message ?? `Get Product Detail Fail (${response.status})`;
    throw new Error(Array.isArray(message) ? message.join(", ") : message);
  }
  const json = (await response.json()) as GetProductDetailResponse;
  return json;
}

export async function updateProductDetail(
  id: string,
  body: UpdateProductDetailRequest,
  signal?: AbortSignal,
): Promise<UpdateProductDetailResponse> {
  const response = await apiClient(`/api/v1/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal,
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message =
      errorData.message ?? `Update Product Detail Fail (${response.status})`;
    throw new Error(Array.isArray(message) ? message.join(", ") : message);
  }
  const json = await response.json();
  return json;
}

export async function deleteProductDetail(
  id: string,
  signal?: AbortSignal,
): Promise<DeleteProductDetailResponse> {
  const response = await apiClient(`/api/v1/products/${id}`, {
    method: "DELETE",
    signal,
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message =
      errorData.message ?? `Delete Product Detail Fail (${response.status})`;
    throw new Error(Array.isArray(message) ? message.join(", ") : message);
  }
  const json = await response.json();
  return json;
}
