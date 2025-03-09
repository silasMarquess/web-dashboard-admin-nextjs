"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";
import { UserSchema } from "@/lib/zodSchemas";
import { z } from "zod";
import {
  getUserById,
  userCreate,
  UserDelete,
  userUpdate,
} from "@/lib/data/usersCrud";

interface registerContextProps {
  titleForm: string;
  CreateUser: ({ name, email, password }: User) => void;
  UpdateUser: (id: string, { name, email, password }: User) => void;
  user: UserIncludeId | undefined;
  setOperatonForm: Dispatch<SetStateAction<Operation>>;
  operationForm: Operation;
  getUpdateUser: (id: string) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

enum Operation {
  registerUser = 1,
  updateUser = 2,
}

type User = z.infer<typeof UserSchema>;

interface UserIncludeId {
  id: string;
  name: string;
  email: string;
  password: string;
}

export const RegisterContext = createContext({} as registerContextProps);

export default function RegisterContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [operationForm, setOperatonForm] = useState<Operation>(1);
  const [user, setUser] = useState<UserIncludeId>();

  const titleForm =
    operationForm == 1 ? "Cadastro de Usuario" : "Atualização de Usuario";

  async function CreateUser({ name, email, password }: User) {
    const response = await userCreate({ name, email, password });
    const userCreated = await response.data;
    console.log(userCreated);
  }

  async function UpdateUser(id: string, { name, email, password }: User) {
    const response = await userUpdate(id, { name, email, password });
    const userUpdated = await response?.data.UserUpdated;
    //retorna o nome do usuario atualizado e mostrar para o usuario
  }

  async function getUpdateUser(id: string) {
    const response = await getUserById(id);
    const user = response?.data.user;
    setUser(user);
  }

  async function deleteUser(id: string) {
    const response = await UserDelete(id);
    const user = await response?.data.user;
    console.log(user);
  }

  return (
    <RegisterContext.Provider
      value={{
        CreateUser,
        UpdateUser,
        user,
        setOperatonForm,
        titleForm,
        getUpdateUser,
        operationForm,
        deleteUser,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}
