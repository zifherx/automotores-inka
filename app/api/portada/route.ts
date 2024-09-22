import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { auth } from "@clerk/nextjs/server";
import Cover from "@/models/Cover";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { userId } = auth();
    const data = await req.json();

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const newPortada = new Cover({ createdBy: userId, ...data });

    const query = await newPortada.save();

    return NextResponse.json(query);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
