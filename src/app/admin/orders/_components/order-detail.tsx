"use client";

import { useState, useEffect } from "react";
import { OrderType } from "@/schema/order.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import orderApi from "@/apiRequest/order";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function OrderDetail({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [order, setOrder] = useState<OrderType | null>(null);
  const [loading, setLoading] = useState(true);

  // Gọi API để lấy chi tiết đơn hàng
  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const response = await orderApi.getOrderById(orderId);
        setOrder(response.payload.data); // Đảm bảo API trả về `data`
      } catch (error) {
        toast.error("Không thể tải chi tiết đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <p className="text-center text-gray-500">Đang tải...</p>;
  }

  if (!order) {
    return <p className="text-center text-gray-500">Không tìm thấy đơn hàng</p>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Chi tiết đơn hàng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Mã đơn hàng</p>
              <p className="text-lg font-medium">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Trạng thái</p>
              <Badge
                variant={
                  order.status === "DELIVERED"
                    ? "default"
                    : order.status === "CANCELLED"
                    ? "destructive"
                    : "outline"
                }
              >
                {order.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-500">Địa chỉ</p>
              <p className="text-lg font-medium">{order.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Số điện thoại</p>
              <p className="text-lg font-medium">{order.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ngày tạo</p>
              <p className="text-lg font-medium">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tổng tiền</p>
              <p className="text-lg font-medium">
                {order.total.toLocaleString()} VND
              </p>
            </div>
          </div>
          <h2 className="text-xl font-semibold mt-6">Sản phẩm</h2>
          <div className="mt-4">
            {order.items && order.items.length > 0 ? (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Tên sản phẩm
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-right">
                      Số lượng
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-right">
                      Giá
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">
                        {item.quantity}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">
                        {item.price.toLocaleString()} VND
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">
                Không có sản phẩm nào trong đơn hàng
              </p>
            )}
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => toast.success("Đã cập nhật trạng thái!")}
            >
              Cập nhật trạng thái
            </Button>
            <Button
              variant="default"
              onClick={() => router.push("/admin/orders")}
            >
              Quay lại
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
