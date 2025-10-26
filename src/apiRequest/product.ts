import http from "@/lib/http";
import {
  CreateProductDtoType,
  UpdateProductDtoType,
  PaginatedProductResponseDtoType,
  ProductResponseDtoType,
  ProductListResponseDtoType,
} from "@/schema/product.schema";
import { ApiResponseType } from "@/schema/product.schema";

const productApi = {
  create: (body: CreateProductDtoType) =>
    http.post<ApiResponseType<ProductResponseDtoType>>("/products", body),

  list: (params?: Record<string, any>) => {
    // Loại bỏ undefined / null / empty string và map tên param nếu cần
    const filteredParams = Object.entries(params || {}).reduce<
      Record<string, string>
    >((acc, [k, v]) => {
      if (v === undefined || v === null) return acc;
      if (typeof v === "string" && v.trim() === "") return acc;
      const key = k === "sort" ? "sortBy" : k; // backend dùng sortBy
      acc[key] = String(v);
      return acc;
    }, {});

    const qs =
      Object.keys(filteredParams).length > 0
        ? "?" + new URLSearchParams(filteredParams).toString()
        : "";

    return http.get<ApiResponseType<PaginatedProductResponseDtoType>>(
      `/products${qs}`
    );
  },

  detail: (id: string) =>
    http.get<ApiResponseType<ProductResponseDtoType>>(`/products/${id}`),

  update: (id: string, body: UpdateProductDtoType) =>
    http.put<ApiResponseType<ProductResponseDtoType>>(`/products/${id}`, body),

  remove: (id: string) =>
    http.delete<ApiResponseType<null>>(`/products/${id}`, undefined),

  patchStock: (id: string, quantity: number) =>
    http.put<ApiResponseType<ProductResponseDtoType>>(`/products/${id}/stock`, {
      quantity,
    }),

  checkStock: (id: string, quantity: number) =>
    http.get<ApiResponseType<{ available: boolean; stock: number }>>(
      `/products/${id}/check-stock?quantity=${quantity}`
    ),
};

export default productApi;
