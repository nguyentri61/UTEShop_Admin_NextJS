import { z } from "zod";

/** -------------------- DTOs -------------------- **/

// DTO để tạo sản phẩm
export const CreateProductDto = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().min(0),
  discountPrice: z.number().min(0).optional(),
  stock: z.number().int().min(0),
  categoryId: z.string().min(1),
});
export type CreateProductDtoType = z.infer<typeof CreateProductDto>;

// DTO để cập nhật sản phẩm
export const UpdateProductDto = CreateProductDto.partial();
export type UpdateProductDtoType = z.infer<typeof UpdateProductDto>;

// DTO để tạo biến thể sản phẩm
export const CreateProductVariantDto = z.object({
  productId: z.string(),
  color: z.string().optional(),
  size: z.string().optional(),
  price: z.number().min(0),
  stock: z.number().int().min(0),
  discountPrice: z.number().min(0).optional(),
});
export type CreateProductVariantDtoType = z.infer<
  typeof CreateProductVariantDto
>;

// DTO để cập nhật biến thể sản phẩm
export const UpdateProductVariantDto = CreateProductVariantDto.partial();
export type UpdateProductVariantDtoType = z.infer<
  typeof UpdateProductVariantDto
>;

/** -------------------- Response Schemas -------------------- **/

// Schema cho danh sách sản phẩm
export const ProductListResponseDto = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  discountPrice: z.number().nullable().optional(),
  discountPercentage: z.number().nullable().optional(),
  stock: z.number(),
  viewCount: z.number().optional(),
  category: z
    .object({ id: z.string(), name: z.string() })
    .nullable()
    .optional(),
  primaryImage: z.string().nullable().optional(),
  averageRating: z.number().nullable().optional(),
  totalReviews: z.number().nullable().optional(),
  isInStock: z.boolean(),
  hasDiscount: z.boolean(),
});
export type ProductListResponseDtoType = z.infer<typeof ProductListResponseDto>;

// Schema cho chi tiết sản phẩm
export const ProductResponseDto = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  price: z.number(),
  discountPrice: z.number().nullable().optional(),
  stock: z.number(),
  images: z
    .array(
      z.object({
        id: z.string(),
        imageUrl: z.string(),
        isPrimary: z.boolean(),
      })
    )
    .optional(),
  variants: z
    .array(
      z.object({
        id: z.string(),
        size: z.string(),
        color: z.string(),
        price: z.number(),
        stock: z.number(),
        sku: z.string().nullable().optional(),
        isInStock: z.boolean(),
      })
    )
    .optional(),
  category: z
    .object({ id: z.string(), name: z.string() })
    .nullable()
    .optional(),
  createdAt: z.string().or(z.date()).optional(),
});
export type ProductResponseDtoType = z.infer<typeof ProductResponseDto>;

// Schema cho chi tiết biến thể sản phẩm
export const ProductVariantDetailResponseDto = z.object({
  id: z.string(),
  productId: z.string(),
  color: z.string().optional(),
  size: z.string().optional(),
  price: z.number(),
  stock: z.number(),
  discountPrice: z.number().optional(),
  product: z
    .object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
    })
    .optional(),
  isInStock: z.boolean(),
});
export type ProductVariantDetailResponseDtoType = z.infer<
  typeof ProductVariantDetailResponseDto
>;

// Schema cho danh sách biến thể sản phẩm
export const ProductVariantListResponseDto = z.object({
  id: z.string(),
  color: z.string().optional(),
  size: z.string().optional(),
  price: z.number(),
  stock: z.number(),
  discountPrice: z.number().optional(),
  isInStock: z.boolean(),
});
export type ProductVariantListResponseDtoType = z.infer<
  typeof ProductVariantListResponseDto
>;

// Schema cho các tùy chọn khả dụng (size, color)
export const AvailableOptionsResponseDto = z.object({
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
});
export type AvailableOptionsResponseDtoType = z.infer<
  typeof AvailableOptionsResponseDto
>;

/** -------------------- Paginated Response -------------------- **/

// Schema cho phản hồi phân trang sản phẩm
export const PaginatedProductResponseDto = z.object({
  data: z.array(ProductListResponseDto),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  }),
});
export type PaginatedProductResponseDtoType = z.infer<
  typeof PaginatedProductResponseDto
>;

/** -------------------- ApiResponse Wrapper -------------------- **/

// ApiResponse wrapper generic
export const ApiResponse = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    status: z.number(),
    message: z.string(),
    data: z.nullable(schema).optional(),
  });

export type ApiResponseType<T> = {
  status: number;
  message: string;
  data: T | null;
};
