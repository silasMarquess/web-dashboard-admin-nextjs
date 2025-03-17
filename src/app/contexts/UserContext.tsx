"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";
interface registerContextProps {
  titleForm: string;
  user: UserIncludeId | undefined;
  setUser: Dispatch<SetStateAction<UserIncludeId | undefined>>;
  setOperatonForm: Dispatch<SetStateAction<Operation>>;
  operationForm: Operation;
}

enum Operation {
  registerUser = 1,
  updateUser = 2,
}

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

  return (
    <RegisterContext.Provider
      value={{
        user,
        setUser,
        setOperatonForm,
        titleForm,
        operationForm,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}
