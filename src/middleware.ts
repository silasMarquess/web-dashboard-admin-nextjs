"use server";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function testeMid(req: NextRequest) {
  console.log("Middleware global");
  NextResponse.next();
}
