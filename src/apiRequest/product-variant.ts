import http from "@/lib/http";
import {
  CreateProductVariantDtoType,
  UpdateProductVariantDtoType,
  ProductVariantDetailResponseDtoType,
  ProductVariantListResponseDtoType,
} from "@/schema/product.schema";

const variantApi = {
  create: (body: CreateProductVariantDtoType) =>
    http.post<ProductVariantDetailResponseDtoType>("/product-variants", body),
  list: () =>
    http.get<ProductVariantListResponseDtoType[]>("/product-variants"),
  listByProduct: (productId: string) =>
    http.get<ProductVariantListResponseDtoType[]>(
      `/product-variants/product/${productId}`
    ),
  sizes: (productId: string) =>
    http.get<string[]>(`/product-variants/product/${productId}/sizes`),
  colors: (productId: string, size?: string) =>
    http.get<string[]>(
      `/product-variants/product/${productId}/colors${
        size ? "?size=" + encodeURIComponent(size) : ""
      }`
    ),
  findByAttributes: (productId: string, size?: string, color?: string) =>
    http.get<ProductVariantDetailResponseDtoType>(
      `/product-variants/find-by-attributes?productId=${encodeURIComponent(
        productId
      )}&size=${encodeURIComponent(size || "")}&color=${encodeURIComponent(
        color || ""
      )}`
    ),
  detail: (id: string) =>
    http.get<ProductVariantDetailResponseDtoType>(`/product-variants/${id}`),
  update: (id: string, body: UpdateProductVariantDtoType) =>
    http.put<ProductVariantDetailResponseDtoType>(
      `/product-variants/${id}`,
      body
    ),
  remove: (id: string) =>
    http.delete<void>(`/product-variants/${id}`, undefined),
  patchStock: (id: string, quantity: number) =>
    http.put<ProductVariantDetailResponseDtoType>(
      `/product-variants/${id}/stock`,
      { quantity }
    ),
  checkStock: (id: string, quantity: number) =>
    http.get<{ available: boolean; stock: number }>(
      `/product-variants/${id}/check-stock?quantity=${quantity}`
    ),
};

export default variantApi;
