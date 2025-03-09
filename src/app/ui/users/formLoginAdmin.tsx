"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { UserSchmeaSignIn } from "@/lib/zodSchemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContextAdmin } from "@/app/contexts/authcontextAdmin";

const FormLoginAdmin = () => {
  const { getTokenAdmin } = useContext(AuthContextAdmin);

  const form = useForm<z.infer<typeof UserSchmeaSignIn>>({
    resolver: zodResolver(UserSchmeaSignIn),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLoginAdmin(adminData: z.infer<typeof UserSchmeaSignIn>) {
    await getTokenAdmin(adminData);
  }

  return (
    <div className="rounded-sm flex flex-col h-auto items-center justify-center shadow-lg md:w-[300px]">
      <Card className="flex flex-col overflow-auto h-full w-full ">
        <CardHeader>
          <CardTitle>Tela de Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLoginAdmin)}
              className="space-y-1.5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Admin:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="informe o email admin"
                      ></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password Admin:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Informe a Senha "
                        type="password"
                      ></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <div className="flex flex-row w-full justify-between items-center mb-0">
                <Button variant={"outline"}>Voltar</Button>
                <Button className="bg-primary" type="submit">
                  Entrar
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormLoginAdmin;
