import React from "react";
import AuthContextUserProvider from "../contexts/authcontextUsers";

export default function BelieverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthContextUserProvider>{children}</AuthContextUserProvider>;
}
