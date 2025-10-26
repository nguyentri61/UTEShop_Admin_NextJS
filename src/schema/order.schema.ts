import { z } from "zod";

// Enum trạng thái đơn hàng
export const OrderStatusEnum = z.enum([
  "NEW",
  "CONFIRMED",
  "PREPARING",
  "SHIPPING",
  "DELIVERED",
  "CANCELLED",
  "CANCEL_REQUEST",
]);

// Schema cho từng sản phẩm trong đơn hàng
export const OrderItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
});

// Schema cho đơn hàng
export const OrderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  userName: z.string(),
  phone: z.string(),
  address: z.string(),
  items: z.array(OrderItemSchema),
  total: z.number(),
  status: OrderStatusEnum,
  createdAt: z.string(),
});

export const OrderResponse = z.object({
  status: z.number(),
  message: z.string(),
  data: OrderSchema,
});
export type OrderResponseType = z.infer<typeof OrderResponse>;

export const OrderListResponse = z.object({
  status: z.number(),
  message: z.string(),
  data: z.array(OrderSchema),
});
export type OrderListResponseType = z.infer<typeof OrderListResponse>;

export const UpdateOrderStatusSchema = z.object({
  status: OrderStatusEnum,
});

// Export types
export type OrderStatusEnumType = z.infer<typeof OrderStatusEnum>;
export type OrderItemType = z.infer<typeof OrderItemSchema>;
export type OrderType = z.infer<typeof OrderSchema>;
export type UpdateOrderStatusType = z.infer<typeof UpdateOrderStatusSchema>;
