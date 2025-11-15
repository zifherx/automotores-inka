import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { dbConnect } from "@/lib/dbConnect";
import Sucursal from "@/models/Sucursal";
import { Marca } from "@/models/Marca";
import { iSede } from "@/types";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const query = await Sucursal.find()
      .sort({ idTiendaNovaly: 1 })
      .populate([
        {
          path: "marcasDisponiblesVentas",
          model: Marca,
          select: "_id name slug imageUrl",
        },
        {
          path: "marcasDisponiblesTaller",
          model: Marca,
          select: "_id name slug imageUrl",
        },
      ])
      .lean<iSede[]>()
      .exec();
    return NextResponse.json({ total: query.length, obj: query });
  } catch (err: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { userId } = await auth();
    const data = await req.json();

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const newObj = new Sucursal({ createdBy: userId, ...data });

    const query = await newObj.save();

    return NextResponse.json({
      success: true,
      message: `Sede creada ✅`,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
