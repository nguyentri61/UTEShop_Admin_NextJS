import http from "@/lib/http";
import { UserResType } from "@/schema/user.schema";

const userApiRequest = {
  getAllUsers: () => http.get<UserResType>("/users"),
};
export default userApiRequest;
