"use client";

import { BelieverSchema } from "@/lib/data/zodSchemas";
import React, { createContext, useState } from "react";
import { z } from "zod";

type BelieverDTO = z.infer<typeof BelieverSchema>;

type BeliverUpdateDTO = {
  id: string;
  dataBeliever: BelieverDTO;
};

enum Operation {
  registerBeliever = 1,
  updateBeliever = 2,
}

interface believerContextProps {
  textButtonSubmit: string;
  titleForm: string;
  operation: Operation;
  believer: BeliverUpdateDTO | undefined;
  setBeliever: React.Dispatch<React.SetStateAction<BeliverUpdateDTO>>;
  setOperation: React.Dispatch<React.SetStateAction<Operation>>;
}
export const believerContext = createContext({} as believerContextProps);

export default function BelieverContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [believer, setBeliever] = useState<BeliverUpdateDTO>(
    {} as BeliverUpdateDTO
  );

  const [operation, setOperation] = useState<Operation>(1);

  const titleForm =
    operation === 2 ? "Operação de Atualização" : "Operação de Cadastro";

  const textButtonSubmit = operation === 2 ? "Atualizar" : "Cadastrar";
  return (
    <believerContext.Provider
      value={{
        textButtonSubmit,
        believer,
        setBeliever,
        titleForm,
        operation,
        setOperation,
      }}
    >
      {children}
    </believerContext.Provider>
  );
}
