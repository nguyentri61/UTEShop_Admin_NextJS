"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import productApi from "@/apiRequest/product";
import EditProductModal from "@/app/admin/products/_components/edit-product-modal";
import ProductVariantTable from "@/app/admin/products/_components/product-variant-table";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  isInStock: boolean;
  hasDiscount: boolean;
  discountPrice?: number | null;
  discountPercentage?: number | null;
  viewCount?: number;
  category?: {
    id: string;
    name: string;
  } | null;
  primaryImage?: string | null;
  averageRating?: number | null;
  totalReviews?: number | null;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface Props {
  loading: boolean;
  data: Product[];
  meta: Meta;
  onRefresh?: () => void;
  onPageChange: (page: number) => void;
}

export default function ProductTable({
  loading,
  data,
  meta,
  onRefresh,
  onPageChange,
}: Props) {
  const [editingProduct, setEditingProduct] = useState<{
    id: string;
    name: string;
    price: number;
    stock: number;
    categoryId?: string;
  } | null>(null);
  const [expandedProductId, setExpandedProductId] = useState<string | null>(
    null
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Xác nhận xóa sản phẩm?")) return;
    try {
      await productApi.remove(id);
      toast.success("Xóa sản phẩm thành công");
      onRefresh?.();
    } catch (err: unknown) {
      toast.error("Xóa sản phẩm thất bại");
    }
  };

  const handleEditProduct = (
    id: string,
    name: string,
    price: number,
    stock: number,
    categoryId?: string
  ) => {
    setEditingProduct({ id, name, price, stock, categoryId });
  };

  const handleCloseEditModal = () => {
    setEditingProduct(null);
  };

  const handleSaveProduct = async (updatedProduct: typeof editingProduct) => {
    if (!updatedProduct) return;
    try {
      await productApi.update(updatedProduct.id, {
        name: updatedProduct.name,
        price: updatedProduct.price,
        stock: updatedProduct.stock,
        categoryId: updatedProduct.categoryId,
      });
      toast.success("Cập nhật sản phẩm thành công");
      onRefresh?.();
      handleCloseEditModal();
    } catch (err: unknown) {
      toast.error("Cập nhật sản phẩm thất bại");
    }
  };

  const handleToggleExpand = (productId: string) => {
    setExpandedProductId((prev) => (prev === productId ? null : productId));
  };

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>STT</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Kho</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length ? (
                data.map((p, idx) => (
                  <React.Fragment key={p.id}>
                    <TableRow>
                      <TableCell>
                        {idx + 1 + (meta.page - 1) * meta.limit}
                      </TableCell>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.price.toLocaleString()}</TableCell>
                      <TableCell>{p.stock}</TableCell>
                      <TableCell>{p.category?.name || "-"}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleExpand(p.id)}
                          >
                            {expandedProductId === p.id ? "Ẩn" : "Xem"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleEditProduct(
                                p.id,
                                p.name,
                                p.price,
                                p.stock,
                                p.category?.id
                              )
                            }
                          >
                            Sửa
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(p.id)}
                          >
                            Xóa
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedProductId === p.id && (
                      <TableRow>
                        <TableCell colSpan={6}>
                          <ProductVariantTable productId={p.id} />
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex flex-col items-center">
            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-2 mt-4">
              {/* Trang đầu */}
              <button
                className={`p-2 rounded-full ${
                  meta.page === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-500"
                }`}
                disabled={meta.page === 1}
                onClick={() => onPageChange(1)}
              >
                <ChevronsLeft className="h-5 w-5" />
              </button>

              {/* Trang trước */}
              <button
                className={`p-2 rounded-full ${
                  meta.page === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-500"
                }`}
                disabled={meta.page === 1}
                onClick={() => onPageChange(meta.page - 1)}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Hiển thị danh sách số trang */}
              {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    className={`px-3 py-1 rounded-full ${
                      meta.page === pageNum
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => onPageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                )
              )}

              {/* Trang sau */}
              <button
                className={`p-2 rounded-full ${
                  meta.page === meta.totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-500"
                }`}
                disabled={meta.page === meta.totalPages}
                onClick={() => onPageChange(meta.page + 1)}
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Trang cuối */}
              <button
                className={`p-2 rounded-full ${
                  meta.page === meta.totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-500"
                }`}
                disabled={meta.page === meta.totalPages}
                onClick={() => onPageChange(meta.totalPages)}
              >
                <ChevronsRight className="h-5 w-5" />
              </button>
            </div>

            {/* Hiển thị trạng thái hiện tại */}
            <div className="text-sm text-muted-foreground text-center mt-2">
              Trang {meta.page} trên tổng số {meta.totalPages}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Modal chỉnh sửa sản phẩm */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={handleCloseEditModal}
          onSave={handleSaveProduct}
        />
      )}
    </>
  );
}
