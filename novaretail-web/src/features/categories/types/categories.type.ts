export type CategoryItem = {
  id: string;
  name: string;
  code: string;
};

export type GetCategoriesResponse = {
  data: CategoryItem[];
};
