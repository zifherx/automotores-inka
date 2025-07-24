import { IconProp } from "@/types";
import { Button } from "../ui/button";

export type BtnAtrasFormProp = {
  onBack: () => void;
  icon: IconProp;
};

export function BtnAtrasForm({ icon: Icon, onBack }: BtnAtrasFormProp) {
  return (
    <Button variant="ghost" className="mr-4" onClick={onBack}>
      <Icon className="w-4 h-4 mr-2" strokeWidth={2} />
      Volver
    </Button>
  );
}
