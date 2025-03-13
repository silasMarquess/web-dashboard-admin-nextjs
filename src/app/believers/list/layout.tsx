"use client";

import { AuthContextUsers } from "@/app/contexts/authcontextUsers";
import BelieverContextProvider from "@/app/contexts/believerContext";
import { useContext, useEffect } from "react";

export default function BelieversLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useContext(AuthContextUsers);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col w-full md:h-[45px] bg-primary justify-center items-center text-white">
        {" "}
        <h2 className="font-medium">{user?.name}</h2>
        <h3>{user?.email}</h3>
      </div>
      <main className="flex grow">
        <BelieverContextProvider>{children}</BelieverContextProvider>
      </main>
    </div>
  );
}
