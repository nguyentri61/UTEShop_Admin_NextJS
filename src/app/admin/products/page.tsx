"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import productApi from "@/apiRequest/product";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ProductTable from "@/app/admin/products/_components/product-table";
import { PaginatedProductResponseDtoType } from "@/schema/product.schema";
import CreateProductButton from "@/app/admin/products/_components/create-product-button";

export default function ProductsPage() {
  const router = useRouter();

  const [page, setPage] = useState(1); // Trang hiện tại
  const [limit] = useState(10); // Số sản phẩm trên mỗi trang
  const [search, setSearch] = useState(""); // Tìm kiếm
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined); // Lọc theo danh mục
  const [sort, setSort] = useState<string | undefined>(undefined); // Sắp xếp

  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const [paginated, setPaginated] =
    useState<PaginatedProductResponseDtoType | null>(null); // Dữ liệu phân trang

  // Hàm lấy dữ liệu sản phẩm từ API
  const fetchProducts = async (currentPage: number = page) => {
    setLoading(true);
    try {
      const r = await productApi.list({
        page: String(currentPage), // Đảm bảo page là chuỗi
        limit: String(limit), // Đảm bảo limit là chuỗi
        search,
        categoryId,
        sort,
      });

      if (r.status !== 200) {
        toast.error("Xảy ra lỗi khi tải sản phẩm");
        setPaginated(null);
        return;
      }

      const payload = r.payload.data; // Dữ liệu trả về từ API
      console.log("Fetched products:", payload);

      // Chuyển đổi meta.page và meta.limit thành số
      const meta = {
        ...payload?.meta,
        page: Number(payload?.meta?.page), // Chuyển page thành số
        limit: Number(payload?.meta?.limit), // Chuyển limit thành số
        totalPages: Number(payload?.meta?.totalPages), // Chuyển totalPages thành số
      };

      // Cập nhật dữ liệu phân trang
      setPaginated({
        data: payload?.data,
        meta,
      });

      // Đồng bộ page với meta.page từ backend
      if (meta.page) {
        setPage(meta.page); // Cập nhật page từ meta
      }
    } catch (err: unknown) {
      toast.error("Lỗi kết nối");
      setPaginated(null);
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi các giá trị liên quan thay đổi
  useEffect(() => {
    fetchProducts(page);
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
          <CreateProductButton />
        </div>
      </div>

      {/* Bộ lọc */}
      <div className="flex gap-2 mb-4">
        <input
          className="input"
          placeholder="Tìm kiếm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* TODO: Thêm UI cho lọc danh mục, khoảng giá, sắp xếp */}
        <Button
          onClick={() => {
            setPage(1); // Đặt lại trang về 1 khi áp dụng bộ lọc
            fetchProducts(1);
          }}
        >
          Áp dụng
        </Button>
      </div>

      {/* Bảng sản phẩm */}
      <ProductTable
        loading={loading}
        data={paginated?.data || []} // Truyền mảng rỗng nếu không có dữ liệu
        meta={
          paginated?.meta || {
            total: 0,
            page: Number(page), // Đảm bảo page là số
            limit: Number(limit), // Đảm bảo limit là số
            totalPages: 1,
          }
        }
        onPageChange={(newPage) => {
          if (newPage > 0 && newPage <= (paginated?.meta?.totalPages || 1)) {
            fetchProducts(newPage); // Lấy dữ liệu cho trang mới
          }
        }}
        onRefresh={() => fetchProducts(page)} // Làm mới dữ liệu cho trang hiện tại
      />
    </div>
  );
}
