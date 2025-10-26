"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import productVariantApi from "@/apiRequest/product-variant";
import { ProductVariantListResponseDtoType } from "@/schema/product.schema";
import AddVariantModal from "@/app/admin/products/_components/edit-variant";
import { useRouter } from "next/navigation";

type Variant = ProductVariantListResponseDtoType;

type Props = {
  productId: string;
  productName: string;
  onClose: () => void;
};

export default function VariantModal({
  productId,
  productName,
  onClose,
}: Props) {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [loading, setLoading] = useState(false);
  const [addingVariant, setAddingVariant] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchVariants = async () => {
      setLoading(true);
      try {
        const response = await productVariantApi.listByProduct(productId);
        const data = response.payload?.data || [];
        setVariants(data);
      } catch (error) {
        toast.error("Không thể tải danh sách biến thể");
      } finally {
        setLoading(false);
      }
    };

    fetchVariants();
  }, [productId]);

  const handleDeleteVariant = async (variantId: string) => {
    if (!confirm("Xác nhận xóa biến thể?")) return;
    try {
      await productVariantApi.remove(variantId);
      setVariants((prev) => prev.filter((v) => v.id !== variantId));
      toast.success("Xóa biến thể thành công");
    } catch (error) {
      toast.error("Xóa biến thể thất bại");
    }
  };

  const handleCloseAddVariantModal = () => {
    setAddingVariant(false);
  };

  const handleSaveVariant = async (newVariant: {
    size: string;
    color: string;
    price: number;
    stock: number;
  }) => {
    try {
      await productVariantApi.create({
        productId,
        ...newVariant,
      });
      toast.success("Thêm biến thể thành công");
      setAddingVariant(false);
      router.refresh();
    } catch (error) {
      toast.error("Thêm biến thể thất bại");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">
          Quản lý biến thể: {productName}
        </h2>
        {loading ? (
          <div>Đang tải...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Size</TableHead>
                <TableHead>Màu</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Kho</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variants.map((v) => (
                <TableRow key={v.id}>
                  <TableCell>{v.size}</TableCell>
                  <TableCell>{v.color}</TableCell>
                  <TableCell>{v.price.toLocaleString()}</TableCell>
                  <TableCell>{v.stock}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Sửa
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteVariant(v.id)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={onClose} variant="outline">
            Đóng
          </Button>
          <Button variant="default" onClick={handleCloseAddVariantModal}>
            Thêm biến thể
          </Button>
        </div>
      </div>
      {addingVariant && (
        <AddVariantModal
          onClose={handleCloseAddVariantModal}
          onSave={handleSaveVariant}
        />
      )}
    </div>
  );
}
