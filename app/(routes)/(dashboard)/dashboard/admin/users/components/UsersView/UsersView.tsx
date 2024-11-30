"use client";

import { TableUsers } from "../TableUsers";

import { tUserPage } from "@/types";
import { BtnAddUser } from "../BtnAddUser";
import { BtnUpdateUser } from "../BtnUpdateUser";

export function UsersView({ users }: tUserPage) {
  return (
    <div className="p-2">
      <div className="flex justify-between mb-3">
        <h2 className="flex items-center gap-1 text-xl md:text-3xl font-headMedium">
          Gestión de Usuarios -{" "}
          {users.length === 0 ? <p>nulo 😭</p> : <p>{users.length}😍</p>}
        </h2>
        <div className="flex justify-between gap-3 items-center">
          <BtnUpdateUser />
          <BtnAddUser />
        </div>
      </div>
      <TableUsers users={users} />
    </div>
  );
}
