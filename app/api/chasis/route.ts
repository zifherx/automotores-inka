import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import Carroceria from "@/models/Carroceria";

import { dbConnect } from "@/lib/dbConnect";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { userId } = await auth();
    const data = await req.json();

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const newChasis = new Carroceria({ createdBy: userId, ...data });

    const query = await newChasis.save();

    return NextResponse.json(query);
  } catch (err) {
    // console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const query = await Carroceria.find({}).sort({ name: 1 });

    return NextResponse.json({ total: query.length, obj: query });
  } catch (err) {
    // console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
