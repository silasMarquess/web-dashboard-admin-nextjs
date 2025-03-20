"use client";

import { AuthContextUsers } from "@/app/contexts/authcontextUsers";
import BelieverContextProvider from "@/app/contexts/believerContext";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Undo2 } from "lucide-react";
import { redirect } from "next/navigation";
import { destroyCookie } from "nookies";
import { useContext } from "react";

export default function BelieversLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useContext(AuthContextUsers);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row w-full md:h-[45px] bg-primary justify-between items-center p-2 text-white">
        {" "}
        {/*nav menu */}
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-primary">
                  {" "}
                  <h2 className="font-medium">{user?.name}</h2>
                </NavigationMenuTrigger>

                <NavigationMenuContent className="w-20 bg-primary">
                  <Button
                    variant="outline"
                    className="w-full rounded-sm"
                    onClick={() => {
                      destroyCookie(undefined, "token", {
                        path: "/",
                      });
                      redirect("/users/login");
                    }}
                  >
                    Sair
                  </Button>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <h3>{user?.email}</h3>
        <Button type="button" onClick={() => redirect("/")}>
          <Undo2 />
        </Button>
      </div>

      <main className="flex grow">
        <BelieverContextProvider>{children}</BelieverContextProvider>
      </main>
    </div>
  );
}
