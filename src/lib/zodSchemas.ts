import { z } from "zod";
import { Category, Status } from "./data/definitions";

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
  name: z.string().min(3, { message: "Name must have at least 3 characters" }),
  email: z.string().email({ message: "Invalidated informed email" }),
  password: z.string().min(6, { message: "password at least 3 characters" }),
});

const UserSchemaSignIn = z.object({
  email: z.string().email({ message: "invalid email" }),
  password: z.string().min(3, { message: "Password is obligatory" }),
});

export { BelieverSchema, UserSchema, UserSchemaSignIn };
