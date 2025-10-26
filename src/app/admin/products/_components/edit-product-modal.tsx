import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import categoryApiRequest from "@/apiRequest/category";

type Category = {
  id: string;
  name: string;
};

type EditProductModalProps = {
  product: {
    id: string;
    name: string;
    price: number;
    stock: number;
    categoryId?: string;
  };
  onClose: () => void;
  onSave: (updatedProduct: {
    id: string;
    name: string;
    price: number;
    stock: number;
    categoryId?: string;
  }) => void;
};

export default function EditProductModal({
  product,
  onClose,
  onSave,
}: EditProductModalProps) {
  const [formData, setFormData] = useState(product);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Fetch danh sách danh mục từ API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await categoryApiRequest.getList();
        setCategories(response.payload?.data || []);
      } catch (error) {
        console.error("Không thể tải danh sách danh mục:", error);
      } finally {
        setLoadingCategories(false);
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

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Chỉnh sửa sản phẩm</h2>
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
              Danh mục
            </label>
            <select
              name="categoryId"
              value={formData.categoryId || ""}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn danh mục</option>
              {loadingCategories ? (
                <option disabled>Đang tải...</option>
              ) : (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
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
