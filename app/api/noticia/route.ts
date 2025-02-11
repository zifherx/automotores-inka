import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { dbConnect } from "@/lib";
import { Noticia } from "@/models";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { userId } = await auth();
    const data = await req.json();

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const newNews = new Noticia({
      ...data,
      createdBy: userId,
      category: null,
      isActive: true,
    });

    const query = await newNews.save();

    return NextResponse.json({
      success: true,
      message: `Noticia creada ✅`,
      res: query,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const query = await Noticia.find().lean();
    return NextResponse.json({
      total: query.length,
      obj: query,
    });
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
