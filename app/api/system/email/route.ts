import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { SystemEmail } from "@/models";
import { dbConnect } from "@/lib";
import { iMailSystem } from "@/types";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const query: iMailSystem[] = await SystemEmail.find({});
    return NextResponse.json({ total: query.length, obj: query });
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { userId } = auth();
    const dataForm = await req.json();

    if (!userId) return new NextResponse("No autorizado", { status: 401 });

    const newEmail = new SystemEmail({ ...dataForm, createdBy: userId });
    const query = await newEmail.save();

    return NextResponse.json({
      message: `Email ${dataForm.email} creado con éxito.`,
      obj: query,
    });
  } catch (err) {
    // console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
