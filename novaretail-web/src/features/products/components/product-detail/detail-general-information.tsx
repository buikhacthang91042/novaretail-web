import React, { useState } from "react";
import { GetProductDetailResponse } from "../../types/product.detail.type";
import { BadgeStatus, Status } from "@/src/shared/utils/badge-status";
import { formatDateTime } from "@/src/shared/utils/date.utils";
import { useParams, useRouter } from "next/navigation";
import { deleteProductDetail } from "../../services/product-detail.service";

type Props = {
  detail: GetProductDetailResponse;
};

function DetailGeneralInformation({ detail }: Props) {
  const [notification, setNotification] = useState("");
  const [isDeleting, setIsDeleting] = useState(true);
  const router = useRouter();
  const param = useParams<{ id: string }>();
  const id = param.id;
  const handleDeleteProduct = async () => {
    const isConfirmed = window.confirm("Are you sure to delete ?");
    if (isConfirmed) {
      setIsDeleting(true);
      setNotification("");
      try {
        const response = await deleteProductDetail(id);
        setNotification(response.message);
        router.push("/products");
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return null;
        if (error instanceof Error) {
          setNotification(error.message);
        } else {
          setNotification("Can not delete product");
        }
      } finally {
        setIsDeleting(false);
      }
    }
  };
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center border-b border-gray-300 py-2">
        <FieldItem label="Product code" value={detail.data.code} />
        <div className="justify-center items-center">
          <label
            className={`p-2 text-sm rounded-full ${BadgeStatus(detail.data.status.toUpperCase() as Status)}`}
          >
            {detail.data.status}
          </label>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-7">
        <FieldItem label="Product Name" value={detail.data.name} />
        <FieldItem label="Brand" value={detail.data.brand.name} />
        <FieldItem label="Category" value={detail.data.category.name} />
        <FieldItem label="Description" value={detail.data.description || "-"} />
        <FieldItem
          label="Created at"
          value={formatDateTime(detail.data.createdAt)}
        />
        <FieldItem
          label="Updated at"
          value={formatDateTime(detail.data.updatedAt)}
        />
      </div>
      <div className="flex justify-end border-t py-4 gap-2 border-gray-300">
        {notification && <span className="text-red-500">{notification}</span>}
        <button
          type="button"
          onClick={() => router.push(`/products/${id}/edit`)}
          className="border border-gray-400 p-2 rounded-lg hover:bg-gray-100 cursor-pointer font-bold "
        >
          Edit product
        </button>
        <button
          type="button"
          onClick={() => handleDeleteProduct()}
          disabled={isDeleting}
          className="border border-red-400 bg-red-500 p-2 rounded-lg hover:bg-red-100 font-semibold cursor-pointer text-white"
        >
          {isDeleting ? "Deleting..." : "Delete Product"}
        </button>
      </div>
    </div>
  );
}

function FieldItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-400 text-lg">{label}</label>
      <span className=" text-md">{value}</span>
    </div>
  );
}

export default DetailGeneralInformation;
