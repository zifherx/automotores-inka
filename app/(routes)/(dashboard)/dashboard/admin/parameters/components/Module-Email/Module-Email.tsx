"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { BtnAddEmail } from "./components/BtnAddEmail";
import { useEffect, useState } from "react";
import { iListMailSystem, iMailSystem } from "@/types";
import { Trash } from "lucide-react";
import BtnEditEmail from "./components/BtnEditEmail/BtnEditEmail";

export function ModuleEmail(props: iListMailSystem) {
  const { mails } = props;
  // const [listEmails, setListEmails] = useState<iMailSystem[]>([]);

  // const getListEmail = async () => {
  //   const query = await axios.get("/api/system/email");
  //   if (query.status === 200) {
  //     setListEmails(query.data.obj);
  //   }
  // };

  // useEffect(() => {
  //   getListEmail();
  // }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between uppercase text-2xl">
          Lista de Correos ({mails.length})
          <BtnAddEmail />
        </CardTitle>
        <CardDescription className="text-sm leading-4 text-grisInka">
          Gestión de correos para el envío de templates en los formularios.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          {mails.length > 0 &&
            mails.map(({ _id, email, area }) => (
              <li key={_id} className="flex justify-between items-center mb-2">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">{email}</p>
                  <p className="text-xs text-slate-400">{area}</p>
                </div>
                <div className="flex justify-between gap-2">
                  <BtnEditEmail />
                  <Button
                    variant="link"
                    size="icon"
                    className="text-redInka hover:shadow-xl hover:rounded-full"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}
