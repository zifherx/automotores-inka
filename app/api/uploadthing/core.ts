import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();

  if (!userId) throw new Error("No Autorizado");

  return { userId };
};

export const ourFileRouter = {
  imageUploaded: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, file };
    }),
  // .onUploadError(({fileKey}) => { console.log(fileKey);}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
