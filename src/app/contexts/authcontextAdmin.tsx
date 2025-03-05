"use client";

import React, { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { redirect } from "next/navigation";
import { z } from "zod";
import { UserSchema } from "@/lib/zodSchemas";
import instanceAxios from "@/lib/data/axios";

type User = {
  email: string;
};

type SignInData = z.infer<typeof UserSchema>;

interface AuthContextAdminProps {
  isAutenticated: boolean;
  user: User;
  getTokenAdmin(user: User): Promise<void>;
}

export const AuthContextAdmin = createContext({} as AuthContextAdminProps);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>({} as User);
  const isAutenticated = !!user;

  useEffect(function () {
    const { token_admin: token } = parseCookies();
    if (token) {
      async function getUser() {
        try {
          const response = await instanceAxios({ url: "auth/admin" });

          if (!response.statusText)
            throw new Error("Erro ao processar requisição");

          const data = await response.data;
          console.log(`data: ${data.user.email}`);
          setUser(data.user);
        } catch (erro) {
          console.log(erro);
        }
      }
      getUser();
    }
  }, []);

  //buscar meu token e alterar o estado do componente
  async function getTokenAdmin({ email, password }: SignInData) {
    const response = await instanceAxios.post("auth/admin", {
      email,
      password,
    });

    if (!response.statusText) throw new Error("Comunication Error");

    const data = response.data;

    const { userAutenticated, token } = data.userAdmin;

    console.log(userAutenticated);

    setUser({ email: userAutenticated.email });

    //armazenar nos cookies
    setCookie(undefined, "token_admin", token, {
      maxAge: 60 * 60 * 1, //1 hour
    });

    redirect("/admin/users");
  }

  return (
    <AuthContextAdmin.Provider value={{ isAutenticated, getTokenAdmin, user }}>
      {children}
    </AuthContextAdmin.Provider>
  );
}
