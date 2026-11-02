"use client";
import DetailGeneralInformation from "@/src/features/products/components/product-detail/detail-general-information";
import { getProductDetail } from "@/src/features/products/services/product-detail.service";
import { GetProductDetailResponse } from "@/src/features/products/types/product.detail.type";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [detailData, setDetailData] = useState<GetProductDetailResponse | null>(
    null,
  );
  const [detailLoading, setDetailLoading] = useState(true);
  const [detailError, setDetailError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    const fetchDetail = async () => {
      try {
        const response = await getProductDetail(id, controller.signal);
        setDetailData(response);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return null;
        }
        if (error instanceof Error) {
          setDetailError(error.message);
        } else {
          setDetailError("Can Not Get Product Detail");
        }
      } finally {
        if (!controller.signal.aborted) setDetailLoading(false);
      }
    };
    fetchDetail();
    return () => controller.abort();
  }, [id]);
  return (
    <div className="p-10 flex flex-col">
      {detailLoading ? (
        <span>Loading data....</span>
      ) : detailError ? (
        <span>{detailError}</span>
      ) : !detailData ? (
        <span>Can not get product data</span>
      ) : (
        <div className="flex flex-col gap-3">
          <h1 className="text-xl">
            Detail product <strong>{detailData.data.name}</strong>{" "}
          </h1>
          <DetailGeneralInformation detail={detailData} />
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
