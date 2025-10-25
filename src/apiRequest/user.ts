import http from "@/lib/http";
import { UpdateUserRequestType, UserResType } from "@/schema/user.schema";

const userApiRequest = {
  getAllUsers: () => http.get<UserResType>("/users"),

  updateUser: (id: string, data: UpdateUserRequestType) =>
    http.put(`/users/${id}`, data),

  blockUser: (id: string, blocked: boolean) =>
    http.put(`/users/${id}/block`, { blocked }),
};
export default userApiRequest;
