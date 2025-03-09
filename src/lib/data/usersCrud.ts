import { z } from "zod";
import { UserSchema } from "../zodSchemas";
import { redirect } from "next/navigation";
import instanceAxios from "./axios";
import { userOmitPassword } from "./definitions";

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

const userCreate = async ({
  name,
  email,
  password,
}: z.infer<typeof UserSchema>) => {
  const url = "/admin/users";
  const newUser = { name, email, password };
  console.log(newUser);
  const response = await instanceAxios.post(url, {
    name,
    email,
    password,
  });

  if (!response.statusText) throw new Error("error");
  return response;
};

const userUpdate = async (
  id: string,
  { name, password, email }: z.infer<typeof UserSchema>
) => {
  const url = `/admin/users/${id}`;
  try {
    const response = await instanceAxios.put(url, {
      name,
      email,
      password,
    });
    if (!response.statusText) throw new Error("Error request");
    return response;
  } catch (erro) {
    console.log(erro);
  }
};

const UserDelete = async (id: string) => {
  const url = `/admin/users/${id}`;
  try {
    const response = await instanceAxios.delete(url);
    if (!response.statusText) throw new Error("Error during the request");
    return response;
  } catch (erro) {
    console.log(erro);
  }
};

const getUserById = async (id: string) => {
  const url = `/admin/users/${id}`;
  try {
    const response = await instanceAxios(url);
    if (!response.statusText) throw new Error("Error during the request");
    return response;
  } catch (error) {
    console.log(error);
  }
};

async function getALlUsers(): Promise<userOmitPassword[] | undefined> {
  const url = "/admin/users";
  try {
    const response = await instanceAxios(url);
    const users = response.data.users;
    if (!users) throw new Error("Error when processing request");
    return users;
  } catch (error) {
    console.log(error);
  }
}

export { login, getALlUsers, userCreate, userUpdate, getUserById, UserDelete };
