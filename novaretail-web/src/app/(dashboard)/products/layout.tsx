import PermissionGuard from "@/src/shared/components/auth/permission-guard";
import React from "react";

function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PermissionGuard permission="product.read">{children}</PermissionGuard>
    </>
  );
}

export default ProductLayout;
