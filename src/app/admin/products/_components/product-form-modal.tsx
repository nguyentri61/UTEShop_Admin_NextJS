import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import productApi from "@/apiRequest/product";
import categoryApiRequest from "@/apiRequest/category";
import { ProductVariantListResponseDtoType } from "@/schema/product.schema";
import { useRouter } from "next/navigation";
import { on } from "events";

type ProductFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function ProductFormModal({
  open,
  onClose,
  onSuccess,
}: ProductFormModalProps) {
  const router = useRouter(); // Sử dụng router để làm mới trang

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    categoryId: "",
  });

  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [variants, setVariants] = useState<ProductVariantListResponseDtoType[]>(
    []
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApiRequest.getList();
        setCategories(response.payload?.data || []);
      } catch (error) {
        toast.error("Không thể tải danh mục");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleAddVariant = () => {
    setVariants((prev) => [
      ...prev,
      { id: Date.now().toString(), size: "", color: "", price: 0, stock: 0 },
    ]);
  };

  const handleVariantChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setVariants((prev) =>
      prev.map((v, i) =>
        i === index
          ? {
              ...v,
              [field]:
                field === "price" || field === "stock" ? Number(value) : value,
            }
          : v
      )
    );
  };

  const handleRemoveVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const productResponse = await productApi.create(formData);
      const productId = productResponse.payload?.data?.id;

      if (productId && variants.length > 0) {
        await Promise.all(
          variants.map((variant) =>
            productApi.createVariant({
              ...variant,
              productId,
            })
          )
        );
      }

      toast.success("Thêm sản phẩm thành công");
      onSuccess();
    } catch (error) {
      toast.error("Thêm sản phẩm thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Thêm sản phẩm</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Mô tả
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Giá
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Kho
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Danh mục
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Biến thể</h3>
            <Button onClick={handleAddVariant} variant="outline" size="sm">
              Thêm biến thể
            </Button>
            <div className="space-y-2 mt-4">
              {variants.map((variant, index) => (
                <div key={variant.id} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Kích thước"
                    value={variant.size || ""}
                    onChange={(e) =>
                      handleVariantChange(index, "size", e.target.value)
                    }
                    className="border rounded-md px-3 py-2 text-sm w-1/4"
                  />
                  <input
                    type="text"
                    placeholder="Màu sắc"
                    value={variant.color || ""}
                    onChange={(e) =>
                      handleVariantChange(index, "color", e.target.value)
                    }
                    className="border rounded-md px-3 py-2 text-sm w-1/4"
                  />
                  <input
                    type="number"
                    placeholder="Giá"
                    value={variant.price}
                    onChange={(e) =>
                      handleVariantChange(
                        index,
                        "price",
                        Number(e.target.value)
                      )
                    }
                    className="border rounded-md px-3 py-2 text-sm w-1/4"
                  />
                  <input
                    type="number"
                    placeholder="Kho"
                    value={variant.stock}
                    onChange={(e) =>
                      handleVariantChange(
                        index,
                        "stock",
                        Number(e.target.value)
                      )
                    }
                    className="border rounded-md px-3 py-2 text-sm w-1/4"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveVariant(index)}
                  >
                    Xóa
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button onClick={onClose} variant="outline">
            Hủy
          </Button>
          <Button onClick={handleSubmit} variant="default" disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </div>
      </div>
    </div>
  );
}
