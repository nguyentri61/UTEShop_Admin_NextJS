"use client";

import { useState, useEffect } from "react";
import { OrderType } from "@/schema/order.schema";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import orderApi from "@/apiRequest/order";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Trash2 } from "lucide-react";

export default function OrderTable() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);

  // Gọi API để lấy danh sách đơn hàng
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await orderApi.getAllOrders();
        setOrders(response.payload.data); // Giả sử API trả về `data` chứa danh sách đơn hàng
      } catch (error) {
        toast.error("Không thể tải danh sách đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Xử lý xóa đơn hàng
  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) return;
    try {
      await orderApi.deleteOrder(id);
      toast.success("Xóa đơn hàng thành công");
      setOrders((prev) => prev.filter((order) => order.id !== id)); // Cập nhật danh sách sau khi xóa
    } catch (error) {
      toast.error("Xóa đơn hàng thất bại");
    }
  };

  return (
    <div>
      {loading ? (
        <p className="text-center text-gray-500">Đang tải...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">Không có đơn hàng nào</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.userName}</TableCell>
                <TableCell>{order.total.toLocaleString()} VND</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      order.status === "DELIVERED"
                        ? "bg-green-100 text-green-800"
                        : order.status === "CANCELLED"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        router.push(`/admin/orders/${order.id}`);
                        console.log("Order ID:", order.id);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(order.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
