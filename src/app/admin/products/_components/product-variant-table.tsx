import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import productVariantApi from "@/apiRequest/product-variant";
import { ProductVariantListResponseDtoType } from "@/schema/product.schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import EditVariantModal from "@/app/admin/products/_components/edit-variant";
import AddVariantModal from "@/app/admin/products/_components/add-variant-modal";

type Props = {
  productId: string;
};

export default function ProductVariantTable({ productId }: Props) {
  const [variants, setVariants] = useState<ProductVariantListResponseDtoType[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [addingVariant, setAddingVariant] = useState(false);
  const [editingVariant, setEditingVariant] =
    useState<ProductVariantListResponseDtoType | null>(null);

  useEffect(() => {
    const fetchVariants = async () => {
      setLoading(true);
      try {
        const response = await productVariantApi.listByProduct(productId);
        setVariants(response.payload?.data || []);
      } catch (error) {
        console.error("Không thể tải danh sách biến thể:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVariants();
  }, [productId]);

  const handleEditVariant = (variant: ProductVariantListResponseDtoType) => {
    setEditingVariant(variant);
  };

  const handleCloseEditVariantModal = () => {
    setEditingVariant(null);
  };

  const handleSaveVariant = async (newVariant: {
    size: string;
    color: string;
    price: number;
    stock: number;
  }) => {
    try {
      const response = await productVariantApi.create({
        productId,
        ...newVariant,
      });
      setVariants((prev) => [...prev, response.payload.data]);
      toast.success("Thêm biến thể thành công");
      setAddingVariant(false);
    } catch (error) {
      toast.error("Thêm biến thể thất bại");
    }
  };

  const handleUpdateVariant = async (
    updatedVariant: ProductVariantListResponseDtoType
  ) => {
    try {
      await productVariantApi.update(updatedVariant.id, updatedVariant);
      setVariants((prev) =>
        prev.map((v) => (v.id === updatedVariant.id ? updatedVariant : v))
      );
      toast.success("Cập nhật biến thể thành công");
      handleCloseEditVariantModal();
    } catch (error) {
      toast.error("Cập nhật biến thể thất bại");
    }
  };

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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Danh sách biến thể</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAddingVariant(true)}
        >
          Thêm biến thể
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kích thước</TableHead>
            <TableHead>Màu sắc</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Kho</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Đang tải...
              </TableCell>
            </TableRow>
          ) : variants.length > 0 ? (
            variants.map((v) => (
              <TableRow key={v.id}>
                <TableCell>{v.size || "-"}</TableCell>
                <TableCell>{v.color || "-"}</TableCell>
                <TableCell>{v.price.toLocaleString()}</TableCell>
                <TableCell>{v.stock}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditVariant(v)}
                    >
                      Chỉnh sửa
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Không có biến thể
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {addingVariant && (
        <AddVariantModal
          onClose={() => setAddingVariant(false)}
          onSave={handleSaveVariant}
        />
      )}
      {editingVariant && (
        <EditVariantModal
          variant={editingVariant}
          onClose={handleCloseEditVariantModal}
          onSave={handleUpdateVariant}
        />
      )}
    </div>
  );
}
