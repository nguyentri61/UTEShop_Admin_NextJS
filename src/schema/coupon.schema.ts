import { z } from "zod";

// Enum loại coupon
export const CouponTypeEnum = z.enum(["SHIPPING", "PRODUCT"]);

// Schema cho Coupon
export const CouponSchema = z.object({
  id: z.string(),
  code: z.string(),
  type: CouponTypeEnum,
  description: z.string().optional(),
  discount: z.number(),
  minOrderValue: z.number(),
  expiredAt: z.date(), // Sửa thành kiểu `Date`
});
export type CouponType = z.infer<typeof CouponSchema>;

// Schema cho response trả về một Coupon
export const CouponResponse = z.object({
  status: z.number(),
  message: z.string(),
  data: CouponSchema,
});
export type CouponResponseType = z.infer<typeof CouponResponse>;

// Schema cho response trả về danh sách Coupon
export const CouponListResponse = z.object({
  status: z.number(),
  message: z.string(),
  data: z.array(CouponSchema),
});
export type CouponListResponseType = z.infer<typeof CouponListResponse>;

// Schema cho yêu cầu tạo mới Coupon
export const CreateCouponSchema = z.object({
  code: z.string().min(1, "Code không được để trống"),
  type: CouponTypeEnum,
  description: z.string().optional(),
  discount: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Discount phải lớn hơn hoặc bằng 0")
  ),
  minOrderValue: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Min Order Value phải lớn hơn hoặc bằng 0")
  ),
  expiredAt: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date()
  ),
});
export type CreateCouponType = z.infer<typeof CreateCouponSchema>;

// Schema cho yêu cầu cập nhật Coupon
export const UpdateCouponSchema = z.object({
  code: z.string().min(1, "Code không được để trống"),
  type: CouponTypeEnum,
  description: z.string().optional(),
  discount: z.number().min(0, "Discount phải lớn hơn hoặc bằng 0"),
  minOrderValue: z.number().min(0, "Min Order Value phải lớn hơn hoặc bằng 0"),
  expiredAt: z.date(),
});
export type UpdateCouponType = z.infer<typeof UpdateCouponSchema>;
