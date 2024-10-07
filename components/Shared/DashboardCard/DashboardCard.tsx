import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { tDashbordCard } from "@/types";
import { Loader2, TrendingUp } from "lucide-react";

export function DashboardCard(props: tDashbordCard) {
  const { icon: Icon, mainValue, subtitle, title, isLoadingValue } = props;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-textRegular">{title}</CardTitle>
        <Icon
          className="h-10 w-10 text-muted-foreground"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </CardHeader>
      <CardContent>
        {isLoadingValue ? (
          <div className="flex justify-start items-center mb-2">
            <Loader2 className="h-10 w-10 animate-spin text-black" />
          </div>
        ) : (
          <h2 className="text-4xl font-headMedium flex flex-row items-center gap-3">
            {mainValue}
            <TrendingUp className="w-6 h-6 text-green-600" />
          </h2>
        )}
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
