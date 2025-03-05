import { z } from "zod";
import { UserSchema } from "../zodSchemas";
import { redirect } from "next/navigation";

const login = async (values: z.infer<typeof UserSchema>) => {
  const url = "http://localhost:3001/api/v1/auth/users/login";
  const user = {
    email: values.email,
    password: values.password,
  };

  console.log(user);

  try {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user,
      }),
    });
    console.log(response.body);
    if (!response.ok) throw new Error();
    redirect("/believers/register");
  } catch (erro) {
    console.log(erro);
  }
};

const AdminLogin = async (values: z.infer<typeof UserSchema>) => {
  const url = "http://localhost:3001/api/v1/auth/admin";
};

export { login, AdminLogin };
