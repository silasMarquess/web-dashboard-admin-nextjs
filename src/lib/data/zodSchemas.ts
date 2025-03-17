import { z } from "zod";
import { Category, Status } from "./definitions";

const BelieverSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter no minimo 3 caracteres" }),
  surname: z
    .string()
    .min(3, { message: "Sobrenome deve ter no minimo 3 caracteres" }),
  birth: z.string().refine((value) => {
    const dateString = value.split("/");
    const dataBD = Date.parse(
      `${dateString[2]}-${dateString[1]}-${dateString[0]}`
    );
    return !isNaN(dataBD);
  }, "Data Invalida"),
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
