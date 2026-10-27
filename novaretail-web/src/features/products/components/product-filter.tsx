"use client";

import { GetBrandsResponse } from "../../brands/types/brand.types";
import { GetCategoriesResponse } from "../../categories/types/categories.type";
type Props = {
  onFilterChange: (patch: Partial<Props["filters"]>) => void;
  brandList: GetBrandsResponse;
  categoryList: GetCategoriesResponse;
  filters: {
    search: string;
    status: "" | "ACTIVE" | "INACTIVE" | "ARCHIVED";
    brandId: string;
    categoryId: string;
  };
  brandLoading: boolean;
  brandError: string;
  categoryLoading: boolean;
  categoryError: string;
};
function ProductFilter({
  onFilterChange,
  brandList,
  categoryList,
  filters,
  brandError,
  brandLoading,
  categoryError,
  categoryLoading,
}: Props) {
  const handleFilterChange = (key: keyof Props["filters"], value: string) =>
    onFilterChange({
      [key]: value,
    });

  return (
    <div className="border border-gray-500 rounded-xl p-5 grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-sm">Search</label>
        <input
          type="text"
          placeholder="Search by name, id,..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="border border-gray-400 rounded-md h-11 px-2"
        />
      </div>
      <div className="flex w-full gap-2">
        <div className="flex flex-1 min-w-0 flex-col gap-1">
          <label className="text-gray-500 text-sm">Status</label>
          <select
            value={filters.status}
            onChange={(e) =>
              handleFilterChange(
                "status",
                e.target.value as "" | "ACTIVE" | "INACTIVE" | "ARCHIVED",
              )
            }
            className="border border-gray-400 rounded-md h-11 text-gray-500 "
          >
            <option value="">All statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
        <div className="flex flex-1 min-w-0  flex-col gap-1">
          <label className="text-gray-500 text-sm">Brand</label>
          <select
            value={filters.brandId}
            onChange={(e) => handleFilterChange("brandId", e.target.value)}
            className={` border border-gray-400 rounded-md h-11 text-gray-500`}
            disabled={brandLoading || Boolean(brandError)}
          >
            {brandLoading ? (
              <option>Brands loading...</option>
            ) : brandError ? (
              <option value="">{brandError}</option>
            ) : (
              <>
                <option value="">All brands</option>
                {brandList.data.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        <div className="flex  flex-1 min-w-0 flex-col gap-1">
          <label className="text-gray-500 text-sm">Category</label>
          <select
            value={filters.categoryId}
            onChange={(e) => handleFilterChange("categoryId", e.target.value)}
            className="border border-gray-400 rounded-md h-11 text-gray-500"
            disabled={categoryLoading || Boolean(categoryError)}
          >
            {categoryLoading ? (
              <option>Categories loading...</option>
            ) : categoryError ? (
              <option value="">{categoryError}</option>
            ) : (
              <>
                <option value="">All categories</option>
                {categoryList.data.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
      </div>
    </div>
  );
}

export default ProductFilter;
