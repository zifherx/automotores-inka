import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DIContainer } from "@/config/di-container";
import { MongoosePresupuestoRepositoryImplement } from "@/repositories/implementations/mongoose/presupuesto.repository";
import { PresupuestoService } from "@/services/presupuesto.service";
import { ResponseFactory } from "@/utils/response-factory";
import { APIMessages } from "@/utils/constants";

import { dbConnect, UnauthorizedError } from "@/lib";
import { Presupuesto } from "@/models/Presupuesto";

const RESOURCE_NAME = "Presupuesto";

const container = DIContainer.getInstance();
const presupuestoRepository = new MongoosePresupuestoRepositoryImplement(
  Presupuesto
);
container.register("IPresupuestoRepository", presupuestoRepository);
const presupuestoService = new PresupuestoService(
  container.get("IPresupuestoRepository")
);

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { userId } = await auth();
    const body = await req.json();

    // if (!userId) throw new UnauthorizedError("No autorizado");
    const query = await presupuestoService.createResource(body);

    return ResponseFactory.success(
      query,
      APIMessages.getCreateMessage(RESOURCE_NAME)
    );
  } catch (err: any) {
    return ResponseFactory.error(err);
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const { userId } = await auth();
    const { searchParams } = req.nextUrl;
    const params = Object.fromEntries(searchParams);

    // if(!userId) throw new UnauthorizedError("No autorizado")
    const query = await presupuestoService.getResources(params);
    return ResponseFactory.success(
      query,
      APIMessages.getListedMessage(RESOURCE_NAME)
    );
  } catch (err: any) {
    return ResponseFactory.error(err);
  }
}
