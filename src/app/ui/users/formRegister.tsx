"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserSchema } from "@/lib/data/zodSchemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { RegisterContext } from "@/app/contexts/UserContext";
import { userCreate, userUpdate } from "@/lib/data/userAdminCrud";
import { getErrorMessage } from "@/lib/helpers/getTypeError";

const FormRegisterUser = ({ onClose }: { onClose: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { titleForm, user, operationForm } = useContext(RegisterContext);

  function handlePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  async function handelCreateNewUser({
    name,
    email,
    password,
  }: z.infer<typeof UserSchema>) {
    try {
      const response = await userCreate({ name, email, password });
      if (!response.statusText) return alert(getErrorMessage(response.status));
      const userCreated = await response.data.user;
      alert(`${userCreated.name} criado com sucesso`);
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  }

  async function handleUpdateUser({
    name,
    email,
    password,
  }: z.infer<typeof UserSchema>) {
    try {
      if (!user) return alert("Usuario nao selecionado");
      const response = await userUpdate(user?.id, { name, email, password });
      const userUpdated = await response?.data.UserUpdated;
      alert(`${userUpdated.name} atualizado com sucesso`);
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  }

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user && operationForm == 2) {
      form.reset(user);
    }
  }, []);

  return (
    <div className="fixed w-screen h-screen justify-center items-center gap-2 z-50">
      <div className="flex items-cente shadow-sm h-auto p-1 rounded-sm justify-center">
        <Card className="w-full md:w-[300px] shadow-xl h-auto">
          <CardHeader>
            <CardTitle>{titleForm}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(
                  operationForm === 1 ? handelCreateNewUser : handleUpdateUser
                )}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>name:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Informe o nome do usuario"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>email:</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter the email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {operationForm === 1 && (
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>password:</FormLabel>
                        <FormControl>
                          <div className="relative w-full">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="informe password"
                              className="pr-10"
                              {...field}
                            />

                            <Button
                              size="icon"
                              type="button"
                              variant="ghost"
                              className="absolute right-1 top-1/2 -translate-y-1/2"
                              onClick={handlePasswordVisibility}
                            >
                              {showPassword ? <Eye></Eye> : <EyeOff></EyeOff>}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="relative flex left-0 bottom-0 w-full justify-between">
                  <Button onClick={onClose} variant="outline">
                    Voltar
                  </Button>
                  <Button type="submit">Salvar</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FormRegisterUser;
