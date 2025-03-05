"use client";

import { AuthContextAdmin } from "@/app/contexts/authcontextAdmin";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SunMediumIcon } from "lucide-react";
import { parseCookies } from "nookies";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PageAdminUsers() {
  const router = useRouter();
  useEffect(() => {
    const { token_admin } = parseCookies();
    if (!token_admin) router.push("/admin/login");
  }, []);

  const { user } = useContext(AuthContextAdmin);
  return (
    <div className="flex flex-col w-screen h-screen p-2 space-y-1 justify-start items-center">
      <Card className=" flex w-full flex-col">
        <CardHeader>
          <CardTitle>Tabela de Usuarios</CardTitle>
          <CardDescription>Admin:{user.email}</CardDescription>
        </CardHeader>
        <CardContent>
          {/*cabeçalho*/}
          <hr className="w-full"></hr>
          <div className="flex flex-row w-full h-auto justify-items-end p-2 pt-2 space-y-1">
            <Button className="bg-primary rounded-full">
              <SunMediumIcon></SunMediumIcon>
              Adicionar
            </Button>
          </div>
          {/*Corpo da tabela */}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
