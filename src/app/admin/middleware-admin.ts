import { NextRequest, NextResponse } from "next/server";

export default function MidLoginAdmin(req: NextRequest) {
  console.log(req.nextUrl.pathname);
  console.log("passando pelo mid do admin");
  NextResponse.next();
}
