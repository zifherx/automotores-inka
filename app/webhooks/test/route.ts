import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: `The route is working` });
}
