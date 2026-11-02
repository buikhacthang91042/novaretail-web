"use client";
import CreateUpdateProductForm from "@/src/features/products/components/product-create-update-form";
import { getProductDetail } from "@/src/features/products/services/product-detail.service";
import { GetProductDetailResponse } from "@/src/features/products/types/product.detail.type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function ProductEditPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [dataDetailProduct, setDataDetailProduct] =
    useState<GetProductDetailResponse>();
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [errorDetail, setErrorDetail] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchDetail = async () => {
      setLoadingDetail(true);
      setErrorDetail("");
      try {
        const response = await getProductDetail(id, controller.signal);
        setDataDetailProduct(response);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return null;
        }
        if (error instanceof Error) {
          setErrorDetail(error.message);
        } else {
          setErrorDetail("Can not fetch detail product");
        }
      } finally {
        if (!controller.signal.aborted) setLoadingDetail(false);
      }
    };
    fetchDetail();
    return () => controller.abort();
  }, [id]);

  return (
    <>
      {loadingDetail ? (
        <span>Loading....</span>
      ) : errorDetail ? (
        <span>{errorDetail}</span>
      ) : (
        <CreateUpdateProductForm mode="edit" initialData={dataDetailProduct} />
      )}
    </>
  );
}

export default ProductEditPage;
