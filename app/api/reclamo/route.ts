import { NextRequest, NextResponse } from "next/server";

import { dbConnect } from "@/lib";

import Reclamo from "@/models/Reclamo";
import Sucursal from "@/models/Sucursal";
import { iReclamation } from "@/types";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const query = await Reclamo.find({}).sort({ createdAt: 1 });

    return NextResponse.json({ total: query.length, obj: query });
  } catch (err) {
    // console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const data = await req.json();

    const sedeFound = await Sucursal.findOne({ codexHR: data.sedeCompra });

    if (!sedeFound)
      return NextResponse.json(
        { message: `Sede ${data.sedeCompra} no existe.` },
        { status: 404 }
      );

    const newObj = new Reclamo({
      ...data,
      sedeDealer: sedeFound._id,
    }) as iReclamation;

    const query = await newObj.save();

    return NextResponse.json({
      message: `Reclamo '${data.numeroReclamo}' ingresado con éxito`,
      query: query,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
