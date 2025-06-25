import { NextRequest, NextResponse } from "next/server";
import { Marca } from "@/models/Marca";
import Sucursal from "@/models/Sucursal";

import { dbConnect } from "@/lib";

export async function GET(
  req: NextRequest,
  { params }: { params: { slugMarca: string } }
) {
  await dbConnect();

  try {
    const { slugMarca } = params;
    // console.log("slugMarca", slugMarca);

    const marcaFound = await Marca.findOne({ slug: slugMarca });
    // console.log("marcaFound", marcaFound);

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
        "_id name slug address ciudad isActive codexHR marcasDisponiblesVentas marcasDisponiblesTaller"
      )
      .populate([
        {
          path: "marcasDisponiblesVentas",
          select: "_id name slug imageUrl isActive",
        },
        {
          path: "marcasDisponiblesTaller",
          select: "_id name slug imageUrl isActive",
        },
      ]);

    return NextResponse.json({ total: query.length, all: query });
    // return NextResponse.json(query);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
