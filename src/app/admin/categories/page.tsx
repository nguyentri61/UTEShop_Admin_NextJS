"use client";

import { useState } from "react";
import CategoryTable from "@/app/admin/categories/_components/category-table";
import CategoryFormModal from "@/app/admin/categories/_components/category-form-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CategoriesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    setRefreshKey((prev) => prev + 1); // Refresh table
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Quản lý danh mục
          </h1>
          <p className="text-muted-foreground mt-1">
            Quản lý tất cả danh mục sản phẩm
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm danh mục
        </Button>
      </div>

      <CategoryTable key={refreshKey} />

      {/* Create Modal */}
      <CategoryFormModal
        category={null}
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}
