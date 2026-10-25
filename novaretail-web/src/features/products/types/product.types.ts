type ProductBrand = {
  id: string;
  code: string;
  name: string;
};
type ProductCategory = {
  id: string;
  code: string;
  name: string;
};

type ProductPrimaryImage = {
  id: string;
  filePath: string;
  fileName: string;
  altText: string | null;
};
export type GetProductResponse = {
  data: {
    id: string;
    code: string;
    name: string;
    status: "ACTIVE" | "INACTIVE" | "ARCHIVED";
    createdAt: string;
    brand: ProductBrand;
    category: ProductCategory;
    variantCount: number;
    primaryImage: ProductPrimaryImage | null;
  }[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    pageCount: number;
  };
};

export type GetProductQuery = {
  page?: number;
  pageSize?: number;
  search?: string;
  brandId?: string;
  categoryId?: string;
  status?: "ACTIVE" | "INACTIVE" | "ARCHIVED";
};
