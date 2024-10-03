"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { BtnAddEmail } from "./components/BtnAddEmail";
import { useEffect, useState } from "react";
import { iMailSystem } from "@/types";
import { Pencil, Trash } from "lucide-react";

export function ModuleEmail() {
  const [listEmails, setListEmails] = useState<iMailSystem[]>([]);

  const getListEmail = async () => {
    const query = await axios.get("/api/system/email");
    if (query.status === 200) {
      setListEmails(query.data as iMailSystem[]);
    }
  };

  useEffect(() => {
    getListEmail();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between uppercase text-2xl">
          Lista de Correos
          <BtnAddEmail />
        </CardTitle>
        <CardDescription className="text-lg leading-5 text-grisInka">
          Gestión de correos para el envío de templates en los formularios.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          {listEmails.length > 0 &&
            listEmails.map(({ _id, email }) => (
              <li
                key={_id}
                className="text-sm font-semibold items-center flex justify-between"
              >
                {email}
                <div className="flex justify-between gap-2">
                  <Button
                    variant="link"
                    size="icon"
                    className="text-orange-500 hover:shadow-xl hover:rounded-full"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
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
