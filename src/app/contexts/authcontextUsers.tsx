"use client";

import React, { createContext, useEffect, useState } from "react";
import { z } from "zod";
import { UserSchemaSignIn } from "@/lib/data/zodSchemas";
//import { User } from "@/lib/data/definitions";
import { getUserByToken, login } from "@/lib/data/usersCrud";
import { parseCookies, setCookie } from "nookies";
import { useRouter } from "next/navigation";
import instanceAxios from "@/lib/data/axios";

type UserSign = z.infer<typeof UserSchemaSignIn>;

interface AuthContextUsersProps {
  isAutenticated: boolean;
  getTokenUser: ({ email, password }: UserSign) => Promise<void>;
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

type User = {
  id: string;
  name: string;
  email: string;
};

export const AuthContextUsers = createContext({} as AuthContextUsersProps);

export default function AuthContextUserProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [user, setUser] = useState<User>({} as User);
  const isAutenticated = !!user;

  useEffect(() => {
    const { token } = parseCookies();
    if (!!token) {
      async function getUserToken() {
        const response = await getUserByToken();
        const data = await response?.data;
        setUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
        });
      }
      getUserToken();
    }
  }, []);

  async function getTokenUser({ email, password }: UserSign) {
    //buscar token
    const response = await login({ email, password });
    const { token, userAutenticated } = await response?.data;
    setUser({
      id: userAutenticated.id,
      name: userAutenticated.name,
      email: userAutenticated.email,
    });

    setCookie(undefined, "token", token, {
      maxAge: 60 * 60 * 1,
      path: "/",
    });

    instanceAxios.defaults.headers["authorization"] = `Bearer ${token}`;
    //redireionar usuario
    router.push("/believers/list");
  }

  return (
    <AuthContextUsers.Provider
      value={{ isAutenticated, getTokenUser, user, setUser }}
    >
      {children}
    </AuthContextUsers.Provider>
  );
}
