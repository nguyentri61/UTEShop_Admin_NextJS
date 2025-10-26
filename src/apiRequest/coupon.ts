import http from "@/lib/http"; // Sử dụng http client giống như các API khác
import {
  CouponResponseType,
  CouponListResponseType,
  CreateCouponType,
  UpdateCouponType,
} from "@/schema/coupon.schema";

const couponApi = {
  getAllCoupons: () => http.get<CouponListResponseType>("/coupons"),

  getCouponById: (id: string) => http.get<CouponResponseType>(`/coupons/${id}`),

  createCoupon: (data: CreateCouponType) =>
    http.post<CouponResponseType>("/coupons", data),

  updateCoupon: (id: string, data: UpdateCouponType) =>
    http.put<CouponResponseType>(`/coupons/${id}`, data),

  deleteCoupon: (id: string) => http.delete<void>(`/coupons/${id}`, undefined),
};

export default couponApi;
