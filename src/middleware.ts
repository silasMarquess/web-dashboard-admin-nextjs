import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";

export default async function testeMid(req: NextRequest) {
  console.log(`Passando pelo mid na rota: ${req.nextUrl.pathname}`);
  const cookie = req.headers.get("cookie");
  const cookies = parse(cookie || "");
  console.log(cookies.token_admin);
  console.log("Middleware global");
  NextResponse.next();
}
