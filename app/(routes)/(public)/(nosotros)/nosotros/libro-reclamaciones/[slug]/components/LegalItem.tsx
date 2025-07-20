import { cn } from "@/lib";
import { LegalItemProp } from "@/types";

export function LegalItem({ legalProps }: LegalItemProp) {
  const {
    description,
    icon: Icon,
    iconBackground,
    iconColor,
    title,
  } = legalProps;

  return (
    <div className="flex items-start space-x-3">
      <div className={`p-1 rounded-full mt-1 ${iconBackground}`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
