import { z } from "zod";
import { UserSchema, UserSchemaSignIn } from "./zodSchemas";
import { redirect } from "next/navigation";
import instanceAxios from "./axios";
import { userOmitPassword } from "./definitions";

const login = async ({ email, password }: z.infer<typeof UserSchemaSignIn>) => {
  const url = `/auth/users`;
  try {
    const response = await instanceAxios.post(url, {
      email,
      password,
    });
    if (!response.statusText) throw new Error("Requisition error");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getUserByToken = async () => {
  const url = "/auth/user";
  try {
    const response = await instanceAxios(url);
    if (!response.statusText) throw new Error("Requisition error");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { login, getUserByToken };
