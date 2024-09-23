import { Label } from "@/components/ui/label"
import { FormAddReclamo } from "../FormAddReclamo"

import { fechaHoy, horaHoy, setNomenclaturaLRD } from "@/lib"
import { iHojaReclamo } from "@/types"
import { useEffect, useState } from "react"

export function HojaReclamo(props: iHojaReclamo) {
  const {slugType} = props 
  const [codigoLRD, setCodigoLRD] = useState("")

  let today = new Date()
  const nroReclamo = today.getTime()

  useEffect(() => {
    setCodigoLRD(`LRD-${setNomenclaturaLRD(slugType)}-000001-${today.getFullYear()}`)
  },[slugType])

  return (
    <div className="bg-white p-2 md:p-6">
      <div className="flex items-center justify-between pb-5">
        <div className="flex justify-start gap-x-8 md:gap-x-24 ">
          <div className="flex flex-col gap-y-1">
            <Label
              htmlFor="fechaReclamo"
              className="font-bold capitalize text-lg"
            >
              Fecha
            </Label>
            <Label id="fechaReclamo" className="text-base">
              {fechaHoy(today)}
            </Label>
          </div>

          <div className="flex flex-col gap-y-1">
            <Label
              htmlFor="horaReclamo"
              className="font-bold capitalize text-lg"
            >
              Hora
            </Label>
            <Label id="horaReclamo" className="text-base">
              {horaHoy(today)}
            </Label>
          </div>
        </div>

        <div className="flex flex-col justify-end gap-y-1">
          <Label htmlFor="nroReclamo" className="font-bold capitalize text-lg">
            N° Reclamo
          </Label>
          <Label id="nroReclamo" className="text-base">
            {codigoLRD}
          </Label>
        </div>
      </div>

      <FormAddReclamo />
    </div>
  )
}
