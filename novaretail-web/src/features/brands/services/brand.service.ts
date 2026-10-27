import { apiClient } from "@/src/shared/lib/api-client";
import { GetBrandsResponse } from "../types/brand.types";

export async function getBrandList(): Promise<GetBrandsResponse> {
  const response = await apiClient("/api/v1/brands", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(`Get brands failed (${response.status})`);
  }
  const json = await response.json();
  return json;
}
