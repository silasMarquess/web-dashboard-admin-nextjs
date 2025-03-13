"use client";

import { AuthContextAdmin } from "@/app/contexts/authcontextAdmin";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CirclePlus, SunMediumIcon, Trash2, UserRoundPen } from "lucide-react";
import { parseCookies } from "nookies";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormRegisterUser from "@/app/ui/users/formRegister";
import { getALlUsers } from "@/lib/data/userAdminCrud";
import { userOmitPassword } from "@/lib/data/definitions";
import { RegisterContext } from "@/app/contexts/UserContext";

export default function PageAdminUsers() {
  const { user: userAdmin } = useContext(AuthContextAdmin);

  const router = useRouter();
  const { getUpdateUser, setOperatonForm, deleteUser } =
    useContext(RegisterContext);

  const [isActiveForm, setActiveForm] = useState(false);
  const [allUsers, setAllUsers] = useState<userOmitPassword[] | undefined>([]);
  const [delOrUpdate, setDelUpdate] = useState(0);

  function handleActiveForm() {
    setOperatonForm(1);
    setActiveForm(!isActiveForm);
  }

  function handleUpdateUser(id: string) {
    getUpdateUser(id);
    setOperatonForm(2);
    setActiveForm(!isActiveForm);
  }

  function handleDelete(id: string) {
    deleteUser(id);
    setDelUpdate(delOrUpdate + 1);
  }

  useEffect(() => {
    const { token_admin } = parseCookies();
    if (!token_admin) return router.push("/admin/login");

    async function handlegetAllUsers() {
      const users = await getALlUsers();
      setAllUsers(users);
    }
    handlegetAllUsers();
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen p-2 space-y-1 justify-start items-center">
      <Card className=" flex w-full flex-col">
        <CardHeader>
          <CardTitle>Tabela de Usuarios</CardTitle>
          <CardDescription>Admin: {userAdmin?.email} </CardDescription>
        </CardHeader>
        <CardContent>
          {/*cabeçalho*/}
          <hr className="w-full"></hr>
          <div className="flex flex-row w-full h-auto justify-items-end p-2 pt-2 space-y-1">
            <Button
              className="bg-primary rounded-full"
              onClick={handleActiveForm}
            >
              <CirclePlus />
              Adicionar
            </Button>
          </div>
          <div className="flex flex-col h-auto w-full object-cover ">
            {" "}
            <Table className="table-auto">
              <TableCaption>Lista de Usuarios</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">usuario</TableHead>
                  <TableHead>email</TableHead>
                  <TableHead>**</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allUsers?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex flex-row justify-center object-fill gap-1">
                        {/**button delete user */}
                        <Button
                          size="icon"
                          onClick={() => {
                            handleDelete(user.id);
                          }}
                        >
                          <Trash2 />
                          {/**button edit user */}
                        </Button>
                        <Button
                          size="icon"
                          onClick={() => handleUpdateUser(user.id)}
                        >
                          <UserRoundPen />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter>{allUsers?.length} usuarios cadastrados</CardFooter>
      </Card>
      {/**formulario suspenso*/}
      {isActiveForm && (
        <FormRegisterUser onClose={handleActiveForm}></FormRegisterUser>
      )}
    </div>
  );
}
