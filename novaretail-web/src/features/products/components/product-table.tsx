import React from "react";
import { ProductListItem } from "../types/product.types";
import { BadgeStatus } from "@/src/shared/utils/badge-status";
import { BrandItem } from "../../brands/types/brand.types";
import { CategoryItem } from "../../categories/types/categories.type";

type Props = {
  productsList: ProductListItem[];
};
function ProductTable({ productsList }: Props) {
  return (
    <div className="w-full border border-gray-300 overflow-hidden rounded-lg">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 text-gray-500 text-sm font-medium">
            <th className="px-3 py-4 text-left ">Name</th>
            <th className="px-3 py-4 text-left ">Code</th>
            <th className="px-3 py-4 text-left ">Brand</th>
            <th className="px-3 py-4 text-left ">Category</th>
            <th className="px-3 py-4 text-left ">Variant Count</th>
            <th className="px-3 py-4 text-left ">Status</th>
          </tr>
        </thead>
        <tbody>
          {productsList.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-gray-50 border-b border-gray-300 last:border-0"
            >
              <td className="px-3 py-4 ">{product.name}</td>
              <td className="px-3 py-4 ">{product.code}</td>
              <td className="px-3 py-4 ">{product.brand.name}</td>
              <td className="px-3 py-4 ">{product.category.name}</td>
              <td className="px-3 py-4 ">{product.variantCount}</td>
              <td className={`px-3 py-4`}>
                <span
                  className={` rounded-full text-sm px-3 py-1 font-medium ${BadgeStatus(product.status)}`}
                >
                  {product.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
