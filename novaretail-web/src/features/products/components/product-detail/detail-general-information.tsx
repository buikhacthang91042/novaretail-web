import React from "react";
import { GetProductDetailResponse } from "../../types/product.detail.type";
import { BadgeStatus, Status } from "@/src/shared/utils/badge-status";
import { formatDateTime } from "@/src/shared/utils/date.utils";
import { useParams, useRouter } from "next/navigation";

type Props = {
  detail: GetProductDetailResponse;
};

function DetailGeneralInformation({ detail }: Props) {
  const router = useRouter();
  const param = useParams<{ id: string }>();
  const id = param.id;
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
      <div className="flex justify-end border-t py-4  border-gray-300">
        <button
          onClick={() => router.push(`/products/${id}/edit`)}
          className="border border-gray-400 p-2 rounded-lg hover:bg-gray-100 cursor-pointer font-bold "
        >
          Edit product
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
