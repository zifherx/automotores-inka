import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { dbConnect } from "@/lib/dbConnect";
import Sucursal from "@/models/Sucursal";

export async function GET(req: Request) {
  await dbConnect();

  try {
    const query = await Sucursal.find({}).sort({ name: 1 }).populate({
      path: "marcasDisponibles",
      select: "_id name slug imageUrl",
    });
    return NextResponse.json({ total: query.length, obj: query });
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { userId } = auth();
    const data = await req.json();

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const newObj = new Sucursal({ createdBy: userId, ...data });

    const query = await newObj.save();

    return NextResponse.json(query);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
