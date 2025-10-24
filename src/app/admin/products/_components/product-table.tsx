"use client";
import React from "react";
import { PaginatedProductResponseDtoType } from "@/schema/product.schema";
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
import { Eye, Pencil, Trash, Boxes } from "lucide-react";
import { toast } from "sonner";
import productApi from "@/apiRequest/product";

interface Props {
  loading: boolean;
  paginated?: PaginatedProductResponseDtoType | null;
  onRefresh?: () => void;
}

export default function ProductTable({ loading, paginated, onRefresh }: Props) {
  if (loading) return <div>Loading...</div>;
  if (!paginated || paginated.data.length === 0)
    return <div>Chưa có sản phẩm</div>;

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

  return (
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
            {paginated.data.map((p, idx) => (
              <TableRow key={p.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.price.toLocaleString()}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>{p.category?.name || "-"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(p.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Boxes className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
