import RegisterContextProvider, {
  RegisterContext,
} from "@/app/contexts/UserContext";
import React from "react";

export default function UsersPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RegisterContextProvider>{children}</RegisterContextProvider>;
}
