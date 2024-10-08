import { dbConnect } from "@/lib";
import Marca from "@/models/Marca";
import Sucursal from "@/models/Sucursal";
import { NextRequest, NextResponse } from "next/server";

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
      marcasDisponibles: { $in: [marcaFound._id] },
    })
      .select("_id name slug address ciudad isActive codexHR marcasDisponibles")
      .populate({
        path: "marcasDisponibles",
        select: "_id name slug imageUrl isActive",
      });

    return NextResponse.json(query);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
