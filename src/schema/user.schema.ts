import z from "zod";

export const UserRoleEnum = z.enum(["USER", "ADMIN"]);
export const UserGenderEnum = z.enum(["MALE", "FEMALE", "OTHER"]);

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  fullName: z.string(),
  role: UserRoleEnum,
  gender: z.string().nullable(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  blocked: z.boolean(),
});
export type UserType = z.TypeOf<typeof UserSchema>;

export const UserRes = z.object({
  status: z.number(),
  message: z.string(),
  data: UserSchema,
});

export type UserResType = z.TypeOf<typeof UserRes>;

export const UpdateUserRequest = z.object({
  fullName: z.string(),
  address: z.string(),
  phone: z.string(),
  gender: UserGenderEnum.optional(),
});
export type UpdateUserRequestType = z.TypeOf<typeof UpdateUserRequest>;
