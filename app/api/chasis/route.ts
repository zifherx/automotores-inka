import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "@/lib/dbConnect";
import Carroceria from "@/models/Carroceria";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { userId } = auth();
    const data = await req.json();

    console.log(data);

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const newChasis = new Carroceria({ createdBy: userId, ...data });

    const query = await newChasis.save();

    return NextResponse.json(query);
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
