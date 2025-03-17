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
import { Believer, Category, Status } from "@/lib/data/definitions";
import { formatToLocaleBR } from "@/lib/helpers/dateLocale";
import { CirclePlus, Search, Trash2, UserRoundPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { clsx } from "clsx";
import {
  deleteBeliever,
  findAllBelievers,
  getBelieverById,
} from "@/lib/data/believerCrud";
import { getEnumCategory, getEnumStatus } from "@/lib/helpers/getEnumByString";
import { z } from "zod";
import { BelieverSchema } from "@/lib/data/zodSchemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getErrorMessage } from "@/lib/helpers/getTypeError";

type BelieverDTO = z.infer<typeof BelieverSchema>;

const listMonths = [
  {
    value: 0,
    decription: "Janeiro",
  },
  {
    value: 1,
    decription: "Fevereiro",
  },
  {
    value: 2,
    decription: "Março",
  },
  {
    value: 3,
    decription: "Abril",
  },
  {
    value: 4,
    decription: "Maio",
  },
  {
    value: 5,
    decription: "Junho",
  },
  {
    value: 6,
    decription: "Julho",
  },
  {
    value: 7,
    decription: "Agosto",
  },
  {
    value: 8,
    decription: "Setembro",
  },
  {
    value: 9,
    decription: "Outubro",
  },
  {
    value: 10,
    decription: "Novembro",
  },
  {
    value: 11,
    decription: "Dezembro",
  },
  {
    value: 12,
    decription: "All",
  },
];

const BelieverHome = () => {
  const router = useRouter();
  const { setBeliever, setOperation } = useContext(believerContext);

  const [allBelieves, setBelievers] = useState<Believer[] | null>([]);
  const [dayFilter, setDayFilter] = useState<string | undefined>();
  const [monthFilter, setMonthFilter] = useState<string | undefined>(undefined);
  const [confDelete, setConfirDelete] = useState(false);
  const [searchName, setSeachName] = useState<string>("");

  const filterList = monthFilter
    ? allBelieves
        ?.filter(
          (believer) =>
            new Date(believer.birth).getMonth() === Number(monthFilter)
        )
        .filter((believer) =>
          dayFilter
            ? new Date(believer.birth).getDate() === Number(dayFilter)
            : true
        )
    : searchName?.length > 0
    ? allBelieves?.filter((believer) => {
        return (
          believer.name.includes(searchName) ||
          believer.surname.includes(searchName)
        );
      })
    : [];

  async function handleUpdateUser(id: string) {
    try {
      const response = await getBelieverById(id);
      const believerResponse = (await response?.data.believer) as BelieverDTO;
      setBeliever({
        id: id,
        dataBeliever: {
          name: believerResponse.name,
          surname: believerResponse.surname,
          birth: formatToLocaleBR(believerResponse.birth),
          category: getEnumCategory(believerResponse.category),
          status: getEnumStatus(believerResponse.status),
        },
      });
      setOperation(2);
      router.push("/believers/list/register");
    } catch (error) {
      console.log(error);
    }
  }

  async function hanndleDeleteBeliever(id: string) {
    try {
      const conf = confirm("Confirma a exclusao?");
      if (!conf) return alert("Operação cancelada pelo cliente");
      const response = await deleteBeliever(id);

      if (!response?.statusText) {
        alert(getErrorMessage(response.status));
        throw new Error();
      }

      setConfirDelete(!confDelete);

      const believer = response.data.believer;
      alert(`${believer.name} deletado !`);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const { token, token_admin } = parseCookies();
    if (!token && !token_admin) return router.push("/users/login");

    const index = async () => {
      try {
        const response = await findAllBelievers();
        if (!response?.statusText) {
          alert(getErrorMessage(response.status));
          throw new Error();
        }
        const believers = await response?.data.believers;
        setBelievers(believers);
      } catch (error) {
        console.log(error);
      }
    };
    index();
  }, [confDelete]);

  function handleRegister() {
    setOperation(1);
    router.push("/believers/list/register");
  }

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-start space-y-1 p-2 bg-slate-300">
      {/*Cabecalho */}
      <div className="flex flex-row w-full md:w-4/5 mt-2 space-x-1 h-auto items-center rounded justify-between">
        <div className="relative flex grow ">
          {/*search by name */}
          <Input
            type="search"
            className="pl-10 md:w-2/3"
            placeholder="Search for name"
            onChange={(e) => setSeachName(e.target.value)}
          ></Input>
          <Search className="absolute left-1 top-1/2 -translate-y-1/2"></Search>
        </div>
        <Button className="bg-primary rounded-full" onClick={handleRegister}>
          <CirclePlus />
          Adicionar
        </Button>
      </div>

      {/**painel de filtros */}
      <div className="flex flex-row justify-start space-x-1 items-center p-2 h-auto md:w-4/5 w-full gap-1">
        <Select
          onValueChange={(month) => {
            setMonthFilter(month === "12" ? undefined : month);
          }}
        >
          {/*selecão de meses */}
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Mes Nacimento"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {listMonths.map((month) => (
              <SelectItem value={month.value.toString()} key={month.value}>
                {month.decription}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          //value={dayFilter ? dayFilter.toString() : "32"}
          onValueChange={(day) => {
            setDayFilter(day === "32" ? undefined : day);
          }}
        >
          <SelectTrigger className="w-auto">
            <SelectValue placeholder="dia" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 31 }, (_, i: number) => (
              <SelectItem key={i + 1} value={i.toString()}>
                {i + 1}
              </SelectItem>
            ))}
            <SelectItem value={"32"}>All</SelectItem>
          </SelectContent>
        </Select>
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
            {(monthFilter || searchName.length > 0
              ? filterList
              : allBelieves
            )?.map((believer) => (
              <TableRow key={believer.id}>
                <TableCell>{believer.name}</TableCell>
                <TableCell>{believer.surname}</TableCell>
                <TableCell>{formatToLocaleBR(believer.birth)}</TableCell>
                <TableCell>{Category[believer.category]}</TableCell>
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
                    {/*butao de deleção */}
                    <Button
                      size="icon"
                      type="reset"
                      variant="ghost"
                      onClick={() => hanndleDeleteBeliever(believer.id)}
                    >
                      <Trash2 />
                    </Button>
                    {/*butao de edição */}
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleUpdateUser(believer.id)}
                    >
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
                  {filterList
                    ? filterList.length > 0
                      ? `${filterList.length} Filtrados`
                      : `${allBelieves?.length} Cadastrados`
                    : "undefined"}
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
