import { apiClient } from "@/src/shared/lib/api-client";
import { GetCategoriesResponse } from "../types/categories.type";

export async function getCategoryList(): Promise<GetCategoriesResponse> {
  const response = await apiClient("/api/v1/categories", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(`Get categories failed (${response.status})`);
  }
  const json = await response.json();
  return json;
}
