"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ProductFormModal from "@/app/admin/products/_components/product-form-modal";

export default function CreateProductButton() {
  const [showCreate, setShowCreate] = useState(false);
  const router = useRouter();

  const handleCreateSuccess = () => {
    setShowCreate(false); // Đóng modal
    router.refresh(); // Làm mới trang
  };

  return (
    <>
      <Button onClick={() => setShowCreate(true)} variant="default">
        Thêm sản phẩm
      </Button>
      <ProductFormModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSuccess={handleCreateSuccess}
      />
    </>
  );
}
