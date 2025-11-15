import { NextRequest, NextResponse } from "next/server";
import { Marca } from "@/models/Marca";
import Sucursal from "@/models/Sucursal";

import { dbConnect } from "@/lib";
import { iSede } from "@/types";

export async function GET(
  req: NextRequest,
  { params }: { params: { slugMarca: string } }
) {
  await dbConnect();

  try {
    const { slugMarca } = params;

    const marcaFound = await Marca.findOne({ slug: slugMarca });
    if (!marcaFound)
      return NextResponse.json(
        { mesage: `Marca ${slugMarca.toUpperCase()} no encontrada` },
        { status: 404 }
      );

    const query = await Sucursal.find({
      marcasDisponiblesVentas: { $in: [marcaFound._id] },
      isActive: true,
    })
      .select(
        "_id name slug idTiendaNovaly address ciudad isActive codexHR marcasDisponiblesVentas marcasDisponiblesTaller"
      )
      .populate([
        {
          path: "marcasDisponiblesVentas",
          model: Marca,
          select: "_id name slug imageUrl isActive",
        },
        {
          path: "marcasDisponiblesTaller",
          model: Marca,
          select: "_id name slug imageUrl isActive",
        },
      ])
      .lean<iSede[]>()
      .exec();

    return NextResponse.json({ total: query.length, all: query });
    // return NextResponse.json(query);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
