import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { tsidebarLocation } from "@/types";
import Image from "next/image";

export function SidebarUbicanos({ onSelectDealer, sedes }: tsidebarLocation) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Concesionarios</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] md:h-[750px]">
          <div className="space-y-4 p-4">
            {sedes.map((dealer) => (
              <div
                key={dealer._id}
                className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => onSelectDealer(dealer)}
              >
                <div className="flex-shrink-0">
                  <Image
                    src={dealer.imageUrl}
                    alt={dealer.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold">{dealer.name}</h3>
                  <Badge variant="secondary" className="mt-1 mb-2">
                    {dealer.ciudad}
                  </Badge>
                  <p className="text-sm text-gray-600">{dealer.address}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
