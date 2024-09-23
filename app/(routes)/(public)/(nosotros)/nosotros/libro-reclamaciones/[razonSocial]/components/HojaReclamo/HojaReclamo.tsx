import { FormAddReclamo } from "../FormAddReclamo";
import { iHojaReclamo } from "@/types";

export function HojaReclamo(props: iHojaReclamo) {
  const { slugType } = props;

  return (
    <div className="bg-white p-2 md:p-6">
      <FormAddReclamo slugType={slugType} />
    </div>
  );
}
