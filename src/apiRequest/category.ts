import http from "@/lib/http";
import {
  CategoryListResType,
  CategoryDetailResType,
  CreateCategoryBodyType,
  CreateCategoryResType,
  UpdateCategoryBodyType,
  UpdateCategoryResType,
  DeleteCategoryResType,
} from "@/schema/category.schema";

const categoryApiRequest = {
  getList: () => http.get<CategoryListResType>("/categories"),

  getDetail: (id: string) =>
    http.get<CategoryDetailResType>(`/categories/${id}`),

  create: (body: CreateCategoryBodyType) =>
    http.post<CreateCategoryResType>("/categories", body),

  update: (id: string, body: UpdateCategoryBodyType) =>
    http.put<UpdateCategoryResType>(`/categories/${id}`, body),

  delete: (id: string) =>
    http.delete<DeleteCategoryResType>(`/categories/${id}`, undefined),
};

export default categoryApiRequest;
