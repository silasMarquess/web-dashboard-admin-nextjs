"use client";

import { believerContext } from "@/app/contexts/believerContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Believer, Status } from "@/lib/data/definitions";
import { formatDate } from "@/lib/helpers/dateformat";
import { CirclePlus, Search, Trash2, UserRoundPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { clsx } from "clsx";

const BelieverHome = () => {
  const router = useRouter();

  const { setOperation, getAllBelievers } = useContext(believerContext);
  const [allBelieves, setBelievers] = useState<Believer[] | null>([]);

  useEffect(() => {
    const { token } = parseCookies();
    if (!token) return router.push("/users/login");
    const index = async () => {
      const believersList = await getAllBelievers();
      console.log(believersList);
      setBelievers(believersList);
    };
    index();
  }, []);

  function handleRegister() {
    setOperation(1);
    router.push("/believers/list/register");
  }

  function handleUpdateBeliever() {
    setOperation(2);
  }

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-start space-y-2 p-2 bg-slate-300">
      {/*Cabecalho */}
      <div className=" flex flex-row w-full md:w-4/5 mt-2 space-x-1 h-auto items-center rounded justify-between">
        <div className="relative flex grow ">
          <Input
            className="pl-10 md:w-2/3 rounded-full"
            placeholder="Search for name"
          ></Input>
          <Search className="absolute left-1 top-1/2 -translate-y-1/2"></Search>
        </div>
        <Button className="bg-primary rounded-full" onClick={handleRegister}>
          <CirclePlus />
          Adicionar
        </Button>
      </div>
      {/**tabela com dados */}
      <div className="flex flex-col w-full h-auto overflow-auto md:w-4/5 rounded-sm shadow-sm bg-white">
        <Table className="object-cover table-auto">
          <TableCaption>Lista de Membros.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-left">nome</TableHead>
              <TableHead>sobrenome</TableHead>
              <TableHead>nascimento</TableHead>
              <TableHead>categoria</TableHead>
              <TableHead className="text-right">status</TableHead>
              <TableHead>***</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allBelieves?.map((believer) => (
              <TableRow key={believer.id}>
                <TableCell>{believer.name}</TableCell>
                <TableCell>{believer.surname}</TableCell>
                <TableCell>{formatDate(new Date(believer.birth))}</TableCell>
                <TableCell>{believer.category}</TableCell>
                <TableCell
                  className={clsx({
                    "text-red-600": believer.status === Status.INACTIVE,
                    "text-green-500": believer.status === Status.ACTIVE,
                  })}
                >
                  {believer.status}
                </TableCell>
                <TableCell>
                  <div className="flex flex-row justify-center items-center object-fill">
                    <Button size="icon" variant="ghost">
                      <Trash2 />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <UserRoundPen />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>
                {" "}
                <div className="flex flex-row items-center justify-center text-foreground">
                  {allBelieves?.length} Membros Cadastrados
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      {/**roda pé */}
    </div>
  );
};

export default BelieverHome;
