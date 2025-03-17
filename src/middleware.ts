"use server";
import { NextRequest, NextResponse } from "next/server";

export default async function testeMid(req: NextRequest) {
  NextResponse.next();
}
