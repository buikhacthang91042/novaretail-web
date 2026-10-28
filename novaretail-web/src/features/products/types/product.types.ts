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

export type ProductListItem = {
  id: string;
  code: string;
  name: string;
  status: "ACTIVE" | "INACTIVE" | "ARCHIVED";
  createdAt: string;
  brand: ProductBrand;
  category: ProductCategory;
  variantCount: number;
  primaryImage: ProductPrimaryImage | null;
};
export type GetProductQuery = {
  page?: number;
  pageSize?: number;
  search?: string;
  brandId?: string;
  categoryId?: string;
  status?: "" | "ACTIVE" | "INACTIVE" | "ARCHIVED";
};

export type CreateProductPayload = {
  code: string;
  name: string;
  brandId: string;
  categoryId: string;
  description?: string;
};

export type CreateProductResponse = {
  data: {
    id: string;
    brandId: string;
    categoryId: string;
    name: string;
    code: string;
    description: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
};
