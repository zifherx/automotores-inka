import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { DIContainer } from "@/config/di-container";
import { MongoosePortadaRepositoryImplement } from "@/repositories/implementations/mongoose/portada.repository";
import { PortadaService } from "@/services/portada.services";
import { ResponseFactory } from "@/utils/response-factory";
import { APIMessages } from "@/utils/constants";

import { dbConnect, parseSortQuery, UnauthorizedError } from "@/lib";
import { Cover } from "@/models";

const RESOURCE_NAME = "Portada";

const container = DIContainer.getInstance();
const portadaRepository = new MongoosePortadaRepositoryImplement(Cover);
container.register("IPortadaRepository", portadaRepository);
const portadaService = new PortadaService(container.get("IPortadaRepository"));

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { userId } = await auth();
    const body = await req.json();

    if (!userId) throw new UnauthorizedError("No autorizado");
    const query = await portadaService.createResource(body);
    console.log("SAI API | PORTADA | route POST | query", query);
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
    const { searchParams } = req.nextUrl;
    const params = Object.fromEntries(searchParams);

    const query = await portadaService.getResources(params);

    return ResponseFactory.success(
      query,
      APIMessages.getListedMessage(RESOURCE_NAME)
    );
  } catch (err: any) {
    console.error(err.message);
    return ResponseFactory.error(err);
  }
}
