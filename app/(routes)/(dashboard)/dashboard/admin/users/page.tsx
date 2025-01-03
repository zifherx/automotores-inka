import { clerkClient } from "@clerk/nextjs/server";

import { UsersView } from "./components/UsersView";
import { iUser } from "@/interfaces/iAdmin";

export default async function UserAdminPage() {
  const clientClerk = await clerkClient();
  const users = await clientClerk.users.getUserList();

  const usuarios = users.data.map((item) => {
    let newPlain: iUser = {
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      username: item.username,
      hasImage: item.hasImage,
      imageUrl: item.imageUrl,
      email: item.emailAddresses[0].emailAddress,
      banned: item.banned,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };

    return newPlain;
  });

  return <div>{<UsersView users={usuarios} />}</div>;
}
