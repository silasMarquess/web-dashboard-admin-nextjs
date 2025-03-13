"use client";

import React, { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { z } from "zod";
import { UserSchemaSignIn } from "@/lib/zodSchemas";
import instanceAxios from "@/lib/data/axios";
import { useRouter } from "next/navigation";

type User = {
  email: string;
};

type SignInData = z.infer<typeof UserSchemaSignIn>;

interface AuthContextAdminProps {
  isAutenticated: boolean;
  user: User | null;
  getTokenAdmin(user: User): Promise<void>;
}

export const AuthContextAdmin = createContext({} as AuthContextAdminProps);

export default function AuthContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const isAutenticated = !!user;

  useEffect(() => {
    const { token_admin: token } = parseCookies();
    if (!!token) {
      async function getUser() {
        try {
          const response = await instanceAxios("/auth/admin");
          if (!response.statusText)
            throw new Error("Erro ao processar requisição");

          const data = await response.data;
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
    const response = await instanceAxios.post("/auth/admin", {
      email,
      password,
    });

    if (!response.statusText) throw new Error("Comunication Error");

    const data = response.data;

    const { userAutenticated, token } = data.userAdmin;

    setUser({ email: userAutenticated.email });
    //armazenar nos cookies
    setCookie(undefined, "token_admin", token, {
      maxAge: 60 * 60 * 1, //1 hour
    });

    instanceAxios.defaults.headers["authorization_admin"] = `Bearer ${token}`;

    router.push("/admin/users");
  }

  return (
    <AuthContextAdmin.Provider value={{ isAutenticated, getTokenAdmin, user }}>
      {children}
    </AuthContextAdmin.Provider>
  );
}
