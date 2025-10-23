import z from "zod";

export const UserRoleEnum = z.enum(["USER", "ADMIN"]);

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

export const UserRes = z.object({
  status: z.number(),
  message: z.string(),
  data: UserSchema,
});

export type UserResType = z.TypeOf<typeof UserRes>;
