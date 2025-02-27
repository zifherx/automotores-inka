import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { NoticiaService } from "@/services/noticia.services";
import { ResponseFactory } from "@/utils/response-factory";
import { MongooseNoticiaRepositoryImplement } from "@/repositories/implementations/mongoose/noticia.repository";
import { APIMessages } from "@/utils/constants";
import { DIContainer } from "@/config/di-container";

import { Noticia } from "@/models";
import { dbConnect, UnauthorizedError } from "@/lib";

const RESOURCE_NAME = "Noticia";

const container = DIContainer.getInstance();
const noticiaRepository = new MongooseNoticiaRepositoryImplement(Noticia);
container.register("INoticiaRepository", noticiaRepository);
const noticiaService = new NoticiaService(container.get("INoticiaRepository"));

export async function PATCH(
  req: NextRequest,
  { params }: { params: { noticiaId: string } }
) {
  await dbConnect();
  const { userId } = await auth();
  const { noticiaId } = params;
  const body = await req.json();

  try {
    if (!userId) throw new UnauthorizedError("No autorizado");
    const query = await noticiaService.updateResource(noticiaId, body);
    return ResponseFactory.success(
      query,
      APIMessages.getUpdatedMessage(RESOURCE_NAME)
    );
  } catch (err: any) {
    return ResponseFactory.error(err);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { noticiaId: string } }
) {
  await dbConnect();
  try {
    const { userId } = await auth();
    const { noticiaId } = params;

    if (!userId) throw new UnauthorizedError("No autorizado");
    const query = await noticiaService.deleteResource(noticiaId);

    return ResponseFactory.success(
      query,
      APIMessages.getDeletedMessage(RESOURCE_NAME)
    );
  } catch (err: any) {
    return ResponseFactory.error(err);
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { noticiaId: string } }
) {
  await dbConnect();

  try {
    const { userId } = await auth();
    const { noticiaId } = params;

    if (!userId) throw new UnauthorizedError("No autorizado");
    const query = await noticiaService.getResource(noticiaId);
    return ResponseFactory.success(
      query,
      APIMessages.getFetchedMessage(RESOURCE_NAME)
    );
  } catch (err: any) {
    return ResponseFactory.error(err);
  }
}
