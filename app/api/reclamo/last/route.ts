import { NextRequest, NextResponse } from "next/server";
import Reclamo from "@/models/Reclamo";

import { dbConnect } from "@/lib";
import { iReclamation } from "@/types";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const query: iReclamation[] = await Reclamo.find({})
      .select("numeroReclamo")
      .sort({ createdAt: -1 })
      .limit(1);

    return NextResponse.json(query);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
