"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import productApi from "@/apiRequest/product";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import ProductTable from "@/app/admin/products/_components/product-table";
import ProductFormModal from "@/app/admin/products/_components/product-form-modal";
import { PaginatedProductResponseDtoType } from "@/schema/product.schema";

export default function ProductsPage() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<string | undefined>(undefined);

  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paginated, setPaginated] =
    useState<PaginatedProductResponseDtoType | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const r = await productApi.list({
        page: String(page),
        limit: String(limit),
        search,
        categoryId,
        sort,
      });

      if (r.status !== 200) {
        toast.error("Xảy ra lỗi khi tải sản phẩm");
        setPaginated(null);
        return;
      }

      const payload = r.payload.data;
      console.log("Fetched products:", payload);
      setPaginated(payload);
    } catch (err: unknown) {
      toast.error("Lỗi kết nối");
      setPaginated(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, search, categoryId, sort]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold">Quản lý sản phẩm</h2>
          <p className="text-sm text-muted-foreground">
            Danh sách, lọc, tạo, chỉnh sửa sản phẩm
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => setShowCreate(true)}>
            <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
          </Button>
        </div>
      </div>

      {/* filters */}
      <div className="flex gap-2 mb-4">
        <input
          className="input"
          placeholder="Tìm kiếm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* TODO: category select, price range, sort UI */}
        <Button
          onClick={() => {
            setPage(1);
            fetchProducts();
          }}
        >
          Áp dụng
        </Button>
      </div>

      <ProductTable
        loading={loading}
        paginated={paginated}
        onRefresh={() => {
          fetchProducts();
          router.refresh();
        }}
        // optional: pass handlers to change page/sort from child
      />

      <ProductFormModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSuccess={async () => {
          setShowCreate(false);
          await fetchProducts();
          router.refresh();
        }}
      />
    </div>
  );
}
