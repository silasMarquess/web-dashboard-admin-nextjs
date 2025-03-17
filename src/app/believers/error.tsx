"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { disgest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      {/*container error */}
      <div className="flex flex-col w-1/2 h-auto rounded-sm bg-red-100 border space-y-2 justify-center items-center p-1">
        <h1>Um Erro Aconteceu:</h1>
        <h2>{error.message}</h2>
        <Button
          onClick={() => router.push("/believers/list")}
          variant="outline"
          className="flex w-auto"
        >
          Voltar
        </Button>
      </div>
    </div>
  );
}
