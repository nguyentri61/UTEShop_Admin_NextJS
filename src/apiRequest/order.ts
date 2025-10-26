import http from "@/lib/http";
import {
  OrderListResponseType,
  OrderResponseType,
  OrderType,
  UpdateOrderStatusType,
} from "@/schema/order.schema";

const orderApi = {
  getAllOrders: () => http.get<OrderListResponseType>("/orders"),

  getOrderById: (id: string) => http.get<OrderResponseType>(`/orders/${id}`),

  updateOrderStatus: (id: string, data: UpdateOrderStatusType) =>
    http.put(`/orders/${id}/status`, data),

  deleteOrder: (id: string) => http.delete(`/orders/${id}`, undefined),
};

export default orderApi;
