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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LockKeyhole, Save, X } from "lucide-react";
import { UserSchema, UserSchemaSignIn } from "@/lib/data/zodSchemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { AuthContextUsers } from "@/app/contexts/authcontextUsers";
import { parseCookies } from "nookies";

const LoginForm = () => {
  const router = useRouter();
  const { getTokenUser } = useContext(AuthContextUsers);

  async function HandleGetToken(values: z.infer<typeof UserSchemaSignIn>) {
    await getTokenUser(values);
  }

  const form = useForm<z.infer<typeof UserSchemaSignIn>>({
    resolver: zodResolver(UserSchemaSignIn),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const { token_admin } = parseCookies();
    if (!!token_admin) router.push("/believers/list");
  }, []);

  return (
    <Card className="object-cover">
      <CardHeader className="flex flex-col bg-card justify-center items-center">
        <div className="flex flex-row justify-center items-center">
          <LockKeyhole></LockKeyhole>
          <CardTitle>Tela de Login</CardTitle>
        </div>
        <CardDescription>Passe suas credenciais</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(HandleGetToken)}
            className="flex flex-col flex-auto space-y-2 "
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha:</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row w-full h-auto items-center justify-between mt-2">
              <Button variant={"outline"}>
                <X />
                Cancelar
              </Button>
              <Button className="bg-primary focus: bg-blue-600" type="submit">
                <Save />
                Entrar
              </Button>
            </div>

            <div className="flex flex-row w-full justify-around">
              <Link
                href={"/admin/users"}
                className="text-xs text-foreground text-blue-500"
              >
                Usuario não cadastrado? clique aqui !
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
