import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "@/lib/dbConnect";
import Marca from "@/models/Marca";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { userId } = auth();
    const data = await req.json();

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const newMarca = new Marca({ createdBy: userId, ...data });

    const query = await newMarca.save();

    return NextResponse.json(query);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const query = await Marca.find({}).sort({ name: 1 });
    return NextResponse.json({ total: query.length, obj: query });
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
