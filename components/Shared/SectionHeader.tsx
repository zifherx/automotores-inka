import { SectionHeaderProp } from "@/types";
import { CardHeader, CardTitle } from "../ui/card";

export function SectionHeader({
  BgColor,
  icon: Icon,
  iconBgColor,
  iconColor,
  title,
}: SectionHeaderProp) {
  return (
    <CardHeader className={`${BgColor} border-b`}>
      <CardTitle className="flex items-center space-x-3 text-xl text-gray-800">
        <div className={`${iconBgColor} p-2 rounded-full`}>
          <Icon className={`h-6 w-6 ${iconColor}`} strokeWidth={2} />
        </div>
        <span>{title}</span>
      </CardTitle>
    </CardHeader>
  );
}
