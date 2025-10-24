import z from "zod";

export const CategoryRes = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string().nullable(),
  createdAt: z.string(),
});

export type CategoryResType = z.TypeOf<typeof CategoryRes>;

export const CategoryListRes = z.object({
  status: z.number(),
  message: z.string(),
  data: z.array(CategoryRes),
});

export type CategoryListResType = z.TypeOf<typeof CategoryListRes>;

export const CategoryDetailRes = z.object({
  status: z.number(),
  message: z.string(),
  data: CategoryRes,
});

export type CategoryDetailResType = z.TypeOf<typeof CategoryDetailRes>;

export const CreateCategoryBody = z.object({
  name: z.string().trim().min(1, "Tên danh mục là bắt buộc"),
  icon: z.string().trim().optional(),
});

export type CreateCategoryBodyType = z.TypeOf<typeof CreateCategoryBody>;

export const UpdateCategoryBody = z.object({
  name: z.string().trim().min(1, "Tên danh mục là bắt buộc"),
  icon: z.string().trim().optional(),
});

export type UpdateCategoryBodyType = z.TypeOf<typeof UpdateCategoryBody>;

export const CreateCategoryRes = z.object({
  status: z.number(),
  message: z.string(),
  data: CategoryRes,
});

export type CreateCategoryResType = z.TypeOf<typeof CreateCategoryRes>;

export const UpdateCategoryRes = z.object({
  status: z.number(),
  message: z.string(),
  data: CategoryRes,
});

export type UpdateCategoryResType = z.TypeOf<typeof UpdateCategoryRes>;

export const DeleteCategoryRes = z.object({
  status: z.number(),
  message: z.string(),
});

export type DeleteCategoryResType = z.TypeOf<typeof DeleteCategoryRes>;
