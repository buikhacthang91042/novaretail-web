"use client";

import { getBrandList } from "@/src/features/brands/services/brand.service";
import { GetBrandsResponse } from "@/src/features/brands/types/brand.types";
import { getCategoryList } from "@/src/features/categories/services/categories.service";
import { GetCategoriesResponse } from "@/src/features/categories/types/categories.type";
import { createProduct } from "@/src/features/products/services/product.service";
import { AsteriskIcon } from "@/src/shared/components/ui/asterisk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LABEL_CLASSNAME = "font-medium text-gray-600";
function CreateProductForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    brandId: "",
    categoryId: "",
    description: "",
  });
  const [brandList, setBrandList] = useState<GetBrandsResponse>({
    data: [],
  });
  const [brandError, setBrandError] = useState("");
  const [brandLoading, setBrandLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [categoryList, setCategoryList] = useState<GetCategoriesResponse>({
    data: [],
  });
  const [categoryError, setCategoryError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const isReferenceDataReady =
    !brandError &&
    !brandLoading &&
    !categoryError &&
    !categoryLoading &&
    brandList.data.length > 0 &&
    categoryList.data.length > 0;
  const handleChangeData = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isReferenceDataReady || isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      await createProduct(formData);
      router.push("/products");
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Can not create new product");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    async function fetchBrands() {
      setBrandLoading(true);
      setBrandError("");
      try {
        const brands = await getBrandList();
        if (!ignore) setBrandList(brands);
      } catch (error) {
        if (!ignore) {
          setBrandError(
            error instanceof Error ? error.message : "Can not fetch brand !",
          );
        }
      } finally {
        if (!ignore) {
          setBrandLoading(false);
        }
      }
    }
    async function fetchCategories() {
      setCategoryLoading(true);
      setCategoryError("");
      try {
        const categories = await getCategoryList();
        if (!ignore) setCategoryList(categories);
      } catch (error) {
        if (!ignore) {
          setCategoryError(
            error instanceof Error
              ? error.message
              : "Can not fetch categories !",
          );
        }
      } finally {
        if (!ignore) {
          setCategoryLoading(false);
        }
      }
    }
    fetchBrands();
    fetchCategories();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col p-10 gap-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold ">Create New Product</h1>
            <p className="text-gray-400 text-md">
              Input Necessary Information{" "}
            </p>
          </div>
        </div>
        <div className="border border-gray-300 rounded-xl p-4 flex flex-col gap-4">
          <h3 className="font-bold text-xl">General Information</h3>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className={LABEL_CLASSNAME} htmlFor="code">
                  Code <AsteriskIcon />
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Input product code..."
                  maxLength={100}
                  value={formData.code}
                  onChange={(e) => handleChangeData("code", e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className={LABEL_CLASSNAME} htmlFor="name">
                  Name <AsteriskIcon />
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Input product name..."
                  maxLength={100}
                  value={formData.name}
                  onChange={(e) => handleChangeData("name", e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className={LABEL_CLASSNAME} htmlFor="brand">
                  Brand <AsteriskIcon />
                </label>
                <select
                  id="brand"
                  name="brand"
                  className="border border-gray-300 rounded-lg p-2"
                  required
                  value={formData.brandId}
                  onChange={(e) => handleChangeData("brandId", e.target.value)}
                  disabled={brandLoading || Boolean(brandError)}
                >
                  <option value="">
                    {brandLoading
                      ? "Loading brands"
                      : brandList.data.length > 0
                        ? "Select a brand"
                        : "No brands available"}
                  </option>
                  {brandList.data.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
                {brandError && (
                  <span className="text-red-600 text-sm mt-2">
                    {brandError}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="category" className={LABEL_CLASSNAME}>
                  Category <AsteriskIcon />
                </label>
                <select
                  id="category"
                  name="category"
                  className="border border-gray-300 rounded-lg p-2"
                  required
                  value={formData.categoryId}
                  onChange={(e) =>
                    handleChangeData("categoryId", e.target.value)
                  }
                  disabled={categoryLoading || Boolean(categoryError)}
                >
                  <option value="">
                    {categoryLoading
                      ? "Loading categories..."
                      : categoryList.data.length > 0
                        ? "Select a category"
                        : "No category available"}
                  </option>
                  {categoryList.data.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {categoryError && (
                  <span className="text-red-500 text-sm mt-2">
                    {categoryError}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className={LABEL_CLASSNAME}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                maxLength={200}
                className="border border-gray-300 rounded-lg p-2"
                value={formData.description}
                onChange={(e) =>
                  handleChangeData("description", e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          {submitError && (
            <p role="alert" className="text-sm text-red-600">
              {submitError}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting || !isReferenceDataReady}
            className="border p-2 bg-green-600 text-white rounded-lg font-semibold hover:cursor-pointer"
          >
            {isSubmitting ? "Createing..." : "Create New Product"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateProductForm;
