"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { BelieverSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import create from "@/lib/data/believerCrud";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputMask } from "primereact/inputmask";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CardFormRegister = () => {
  const form = useForm<z.infer<typeof BelieverSchema>>({
    resolver: zodResolver(BelieverSchema),
  });

  return (
    <div className="flex flex-col shadow-sm rounded-sm object-cover md:max-h-screen md:w-[500px] md:py-5">
      <Card className="bg-card object-cover md:overflow-auto">
        <CardHeader>
          <div className="flex flex-col justify-center items-center space-y-1">
            <CardTitle>Formulario de Cadastro</CardTitle>
            <CardDescription>Entre com os dados do membro</CardDescription>
            <hr className="w-full" />
          </div>
        </CardHeader>
        <CardContent>
          {/*Formulario de Cadastro */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(create)} className="space-y-1 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Membro:</FormLabel>
                    <FormControl>
                      <Input placeholder="Informe o nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Membro:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Informe o segundo nome"
                        {...field}
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Nascimento:</FormLabel>
                    <FormControl>
                      <InputMask
                        mask="99/99/9999"
                        placeholder="dd/MM/yyyy"
                        className={
                          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria:</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MEMBER">Membro</SelectItem>
                          <SelectItem value="WORKER">Obreiro</SelectItem>
                          <SelectItem value="CONGREGATOR">
                            Congregado
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status:</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ACTIVE">MEMBRO ATIVO</SelectItem>
                          <SelectItem value="INACTIVE">
                            MEMBRO INATIVO
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-5 flex flex-row w-full justify-between relative bottom-0 left-0">
                <Button variant={"outline"}>Cancelar</Button>
                <Button type="submit">Cadastrar</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardFormRegister;
