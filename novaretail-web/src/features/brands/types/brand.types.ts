export type BrandItem = {
  id: string;
  name: string;
  code: string;
};

export type GetBrandsResponse = {
  data: BrandItem[];
};
