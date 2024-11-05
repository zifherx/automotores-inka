import { useRouter } from "next/navigation";
import axios from "axios";

import { iCardContest } from "@/types";
import { onToast } from "@/lib";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash, Upload } from "lucide-react";

export function CardContest(props: iCardContest) {
    const {contest} = props

    const router = useRouter();

  const deleteItem = async () => {
    console.log("Eliminar Item");
    // try {
    //   const query = await axios.delete(`/api/modelo/${model._id}`);
    //   if (query.status === 200) {
    //     onToast("Modelo eliminado ❌");
    //     router.refresh();
    //   }
    // } catch (err) {
    //   onToast("Algo salió mal 😭", "", true);
    // }
  };

  const handlerActive = async (active: boolean) => {
    console.log("Activar Item");
    // try {
    //   const query = await axios.patch(`/api/modelo/${model._id}`, {
    //     isActive: active,
    //   });

    //   if (active) {
    //     onToast("Modelo Activa ✌️");
    //   } else {
    //     onToast("Modelo Inactiva 😒");
    //   }

    //   router.refresh();
    // } catch (err) {
    //   onToast("Algo salió mal 😭", "", true);
    // }
  };

  return (
    <div className="relative pb-1 bg-white rounded-lg shadow-lg hover:shadow-xl">
      <Image
        src=""
        alt=""
        width={600}
        height={300}
        priority
        className="object-contain h-[200px] mt-10"
      />
      {/* {contest.isActive ? (
        <p className="absolute top-0 rigt-0 w-full p-1 text-center text-white bg-green-700 rounded-t-lg">
          Activo
        </p>
      ) : (
        <p className="absolute top-0 left-0 w-full p-1 text-center text-white bg-red-300 rounded-t-lg">
          Inactivo
        </p>
      )} */}

      <div className="relative p-3 mt-2">
        <div className="flex flex-col mb-8 gap-0">
          <p className="text-2xl text-center font-bold">{contest.title}</p>
            <p className="text-xs font-semibold">{contest.bases}</p>

        </div>

        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            className="text-xs uppercase hover:bg-redInka hover:text-white"
            onClick={deleteItem}
          >
            Eliminar
            <Trash className="w-4 h-4 ml-2" />
          </Button>
          {/* <p>Boton Editar</p> */}
        </div>

        {/* {contest.isActive ? (
          <Button
            className="w-full mt-3"
            variant="outline"
            onClick={() => handlerActive(false)}
          >
            Desactivar
            <Upload className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button className="w-full mt-3" onClick={() => handlerActive(true)}>
            Activar
            <Upload className="w-4 h-4 ml-2" />
          </Button>
        )} */}
      </div>
    </div>
  )
}
