import { z } from "zod";

enum Category {
  MEMBER = "MEMBER",
  CONGRATOR = "CONGREGATOR",
  WORKER = "WORKER",
}

enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

const BelieverSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter no minimo 3 caracteres" }),
  surname: z
    .string()
    .min(3, { message: "Sobrenome deve ter no minimo 3 caracteres" }),
  birth: z.string().refine(
    (value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    },
    { message: "Data invalida" }
  ),
  category: z.nativeEnum(Category),
  status: z.nativeEnum(Status),
});

const UserSchema = z.object({
  email: z.string().email({ message: "email invalido informado" }),
  password: z.string().min(6,{message:"senha pelo menos de 3 caracteres"})
});

export { BelieverSchema, UserSchema };
