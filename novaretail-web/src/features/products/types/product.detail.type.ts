export type GetProductDetailResponse = {
  data: {
    id: string;
    name: string;
    code: string;
    description: string | null;
    status: string;
    brand: {
      name: string;
      id: string;
    };
    category: {
      name: string;
      id: string;
    };
    createdAt: string;
    updatedAt: string;
  };
};

export type UpdateProductDetailRequest = {
  name?: string;
  code?: string;
  brandId?: string;
  categoryId?: string;
  description?: string | null;
};

export type UpdateProductDetailResponse = {
  data: {
    id: string;
    brandId: string;
    categoryId: string;
    name: string;
    code: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
};
export type DeleteProductDetailResponse = {
  message: string;
};
