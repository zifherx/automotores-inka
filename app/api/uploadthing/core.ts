import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = await auth();
  if (!userId) throw new UploadThingError("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  imageUploaded: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File Url: ", file.ufsUrl);
      return { uploadedBy: metadata.userId, url: file.ufsUrl };
    }),
  // .onUploadError(({fileKey}) => { console.log(fileKey);}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
