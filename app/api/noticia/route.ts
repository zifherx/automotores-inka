import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { MongooseNoticiaRepositoryImplement } from "@/repositories/implementations/mongoose/noticia.repository";
import { NoticiaService } from "@/services/noticia.services";
import { DIContainer } from "@/config/di-container";
import { ResponseFactory } from "@/utils/response-factory";
import { APIMessages } from "@/utils/constants";

import { dbConnect, UnauthorizedError } from "@/lib";
import { Noticia } from "@/models";

const RESOURCE_NAME = "Noticia";

const container = DIContainer.getInstance();
const noticiaRepository = new MongooseNoticiaRepositoryImplement(Noticia);
container.register("INoticiaRepository", noticiaRepository);
const noticiaService = new NoticiaService(container.get("INoticiaRepository"));

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { userId } = await auth();
    const body = await req.json();

    if (!userId) throw new UnauthorizedError("No autorizado");
    const query = await noticiaService.createResource(body);
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

    if (!userId) throw new UnauthorizedError("No autorizado");
    const query = await noticiaService.getResources(params);
    return ResponseFactory.success(
      query,
      APIMessages.getListedMessage(RESOURCE_NAME)
    );
  } catch (err: any) {
    return ResponseFactory.error(err);
  }
}
