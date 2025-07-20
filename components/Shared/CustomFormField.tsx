import { AlertCircle } from "lucide-react";
import { Label } from "../ui/label";

import { FormFieldProp } from "@/types";

export function CustomFormField({
  label,
  children,
  error,
  optional = false,
  required = false,
}: FormFieldProp) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-headBold text-gray-700">
        {label} {required && <span className="text-redInka">*</span>}
        {optional && <span className="text-gray-400">(Opcional)</span>}
      </Label>
      {children}
      {error && (
        <p className="text-redInka text-sm flex items-center">
          <AlertCircle className="h-5 w-5 mr-1" strokeWidth={2} />
          {error}
        </p>
      )}
    </div>
  );
}
