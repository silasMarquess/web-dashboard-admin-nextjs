"use client";

import React, { createContext, useEffect, useState } from "react";
import instanceAxios from "@/lib/data/axios";
import { parseCookies } from "nookies";

type User = {
  email: string;
};

interface AuthContextAdminProps {
  isAutenticated: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContextAdmin = createContext({} as AuthContextAdminProps);

export default function AuthContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  return (
    <AuthContextAdmin.Provider value={{ isAutenticated, setUser, user }}>
      {children}
    </AuthContextAdmin.Provider>
  );
}
