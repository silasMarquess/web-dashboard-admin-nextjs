"use client";

import { Create, findAllBelievers } from "@/lib/data/believerCrud";
import { Believer } from "@/lib/data/definitions";
import { BelieverSchema } from "@/lib/zodSchemas";
import React, { createContext, useState } from "react";
import { z } from "zod";

interface believerContextProps {
  operation_believer: Operation;
  BelieverRegister: (values: z.infer<typeof BelieverSchema>) => void;
  believer: Believer | null;
  setOperation: React.Dispatch<React.SetStateAction<Operation>>;
  getAllBelievers: () => Promise<Believer[] | null>;
}

enum Operation {
  REGISTER = 1,
  UPDATE = 2,
}

export const believerContext = createContext({} as believerContextProps);

export default function BelieverContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [believer, setBeliever] = useState<Believer>({} as Believer);
  const [operation_believer, setOperation] = useState<Operation>(1);

  async function BelieverRegister(values: z.infer<typeof BelieverSchema>) {
    const response = await Create(values);
    const believer = response?.data.believer;
    console.log(believer);
    setBeliever(believer);
  }

  async function getBelieverUpdate(id: string): Believer | null {}

  async function getAllBelievers(): Promise<Believer[] | null> {
    const response = await findAllBelievers();
    console.log(response);
    const believers = await response?.data.believers;
    return believers;
  }

  return (
    <believerContext.Provider
      value={{
        believer,
        BelieverRegister,
        operation_believer,
        setOperation,
        getAllBelievers,
      }}
    >
      {children}
    </believerContext.Provider>
  );
}
