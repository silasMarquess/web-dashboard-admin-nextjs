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
import { BelieverSchema } from "@/lib/data/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PatternFormat } from "react-number-format";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext, useEffect } from "react";
import { believerContext } from "@/app/contexts/believerContext";
import { useRouter } from "next/navigation";
import { Create, updatedAtBeliever } from "@/lib/data/believerCrud";

const CardFormRegister = () => {
  const router = useRouter();
  const { believer, titleForm, textButtonSubmit, operation } =
    useContext(believerContext);

  const form = useForm<z.infer<typeof BelieverSchema>>({
    resolver: zodResolver(BelieverSchema),
    defaultValues: {
      name: "",
      surname: "",
    },
  });

  useEffect(() => {
    if (!!believer && operation == 2) {
      form.reset(believer?.dataBeliever);
    }
  }, []);

  async function handleOnSubmitBeliever(
    values: z.infer<typeof BelieverSchema>
  ) {
    try {
      const response = await Create({ ...values });
      const believer = await response?.data?.believer;
      const conf: boolean = confirm(
        `${believer.name} criado com sucesso ! deseja criar mais algum?`
      );
      if (!conf) handleTogoback();
    } catch (error) {
      console.log(error);
    } finally {
      handleReset();
    }
  }

  async function handeleSubmitUpdate(
    newDataBeliever: z.infer<typeof BelieverSchema>
  ) {
    try {
      const response = await updatedAtBeliever(believer?.id, newDataBeliever);
      const { believerUpdated } = await response?.data;
      alert(`${believerUpdated.name} atualizado com sucesso...redirecionando`);
      handleTogoback();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleReset() {
    form.reset();
  }

  async function handleTogoback() {
    router.push("/believers/list");
  }

  return (
    <div className="flex flex-col shadow-sm rounded-sm object-cover md:max-h-screen md:w-[500px] md:py-5">
      <Card className="bg-card object-cover md:overflow-auto">
        <CardHeader>
          <div className="flex flex-col justify-center items-center space-y-1">
            <CardTitle>{titleForm}</CardTitle>
            <CardDescription>Entre com os dados do membro</CardDescription>
            <hr className="w-full" />
          </div>
        </CardHeader>
        <CardContent>
          {/*Formulario de Cadastro */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                operation === 2 ? handeleSubmitUpdate : handleOnSubmitBeliever
              )}
              className="space-y-1 "
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Membro:</FormLabel>
                    <FormControl>
                      <Input placeholder="nome do membro" {...field} />
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
                    <FormLabel>Sobrenome:</FormLabel>
                    <FormControl>
                      <Input placeholder="Sobrenome:" {...field}></Input>
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
                    <FormLabel>Nascimento:</FormLabel>
                    <FormControl>
                      <PatternFormat
                        {...field}
                        format="##/##/####"
                        mask={"_"}
                        defaultValue={
                          operation === 2 ? believer?.dataBeliever?.birth : ""
                        }
                        customInput={Input}
                      ></PatternFormat>
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
                        onValueChange={(value) => field.onChange(value)}
                        value={
                          field.value || operation === 2
                            ? believer?.dataBeliever?.category
                            : field.value
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MEMBER">MEMBRO</SelectItem>
                          <SelectItem value="WORKER">OBREIRO</SelectItem>
                          <SelectItem value="CONGREGATOR">
                            CONGREGADO
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
                        value={
                          field.value || operation === 2
                            ? believer?.dataBeliever?.status
                            : field.value
                        }
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
                <Button
                  variant={"outline"}
                  type="button"
                  onClick={() => handleTogoback()}
                >
                  Cancelar
                </Button>
                <Button type="submit">{textButtonSubmit}</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardFormRegister;
