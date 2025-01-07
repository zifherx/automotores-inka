import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { auth } from "@clerk/nextjs/server";
import Cover from "@/models/Cover";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const query = await Cover.find({}).sort({ createdBy: 1 });
    return NextResponse.json({ total: query.length, obj: query });
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { userId } = await auth();
    const data = await req.json();

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const newPortada = new Cover({ createdBy: userId, ...data });

    const query = await newPortada.save();

    return NextResponse.json(query);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
