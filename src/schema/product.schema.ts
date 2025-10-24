import { z } from "zod";

/**
 * DTO & response schemas
 */
export const CreateProductDto = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().min(0),
  discountPrice: z.number().min(0).optional(),
  stock: z.number().int().min(0),
  categoryId: z.string().min(1),
});
export type CreateProductDtoType = z.infer<typeof CreateProductDto>;

export const UpdateProductDto = CreateProductDto.partial();
export type UpdateProductDtoType = z.infer<typeof UpdateProductDto>;

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

export const ImageDto = z.object({
  id: z.string(),
  imageUrl: z.string(),
  isPrimary: z.boolean(),
});
export type ImageDtoType = z.infer<typeof ImageDto>;

export const ProductVariantListResponseDto = z.object({
  id: z.string(),
  size: z.string(),
  color: z.string(),
  price: z.number(),
  stock: z.number(),
  sku: z.string().nullable().optional(),
  isInStock: z.boolean(),
});
export type ProductVariantListResponseDtoType = z.infer<
  typeof ProductVariantListResponseDto
>;

export const ProductResponseDto = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  price: z.number(),
  discountPrice: z.number().nullable().optional(),
  stock: z.number(),
  images: z.array(ImageDto).optional(),
  variants: z.array(ProductVariantListResponseDto).optional(),
  category: z
    .object({ id: z.string(), name: z.string() })
    .nullable()
    .optional(),
  createdAt: z.string().or(z.date()).optional(),
});
export type ProductResponseDtoType = z.infer<typeof ProductResponseDto>;

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

/** Variants */
export const CreateProductVariantDto = z.object({
  productId: z.string(),
  size: z.string(),
  color: z.string(),
  price: z.number().min(0),
  stock: z.number().int().min(0),
  sku: z.string().optional(),
  imageUrl: z.string().optional(),
});
export type CreateProductVariantDtoType = z.infer<
  typeof CreateProductVariantDto
>;

export const UpdateProductVariantDto = CreateProductVariantDto.partial();
export type UpdateProductVariantDtoType = z.infer<
  typeof UpdateProductVariantDto
>;

export const ProductVariantDetailResponseDto =
  ProductVariantListResponseDto.extend({
    product: z
      .object({
        id: z.string(),
        name: z.string(),
        price: z.number(),
      })
      .optional(),
    createdAt: z.string().optional(),
  });
export type ProductVariantDetailResponseDtoType = z.infer<
  typeof ProductVariantDetailResponseDto
>;

/** Available options */
export const AvailableOptionsResponseDto = z.object({
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
});
export type AvailableOptionsResponseDtoType = z.infer<
  typeof AvailableOptionsResponseDto
>;

/** ApiResponse wrapper generic (frontend) */
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
