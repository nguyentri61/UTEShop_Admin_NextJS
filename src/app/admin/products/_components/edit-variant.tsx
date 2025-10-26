import React, { useState } from "react";
import { Button } from "@/components/ui/button";

type EditVariantModalProps = {
  variant: {
    id: string;
    size?: string;
    color?: string;
    price: number;
    stock: number;
    isInStock?: boolean;
    discountPrice?: number;
  };
  onClose: () => void;
  onSave: (updatedVariant: {
    id: string;
    size?: string;
    color?: string;
    price: number;
    stock: number;
    isInStock?: boolean;
    discountPrice?: number;
  }) => void;
};

export default function EditVariantModal({
  variant,
  onClose,
  onSave,
}: EditVariantModalProps) {
  const [formData, setFormData] = useState({
    ...variant,
    size: variant.size || "", // Nếu undefined, gán giá trị mặc định là ""
    color: variant.color || "", // Nếu undefined, gán giá trị mặc định là ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Chỉnh sửa biến thể</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Kích thước
            </label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Màu sắc
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Giá khuyến mãi
            </label>
            <input
              type="number"
              name="discountPrice"
              value={formData.discountPrice || ""}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button onClick={onClose} variant="outline">
            Hủy
          </Button>
          <Button onClick={handleSubmit} variant="default">
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
}
