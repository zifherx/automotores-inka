import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardUbicanos } from "../CardUbicanos";
import { iListSede } from "@/types";

export function TabRedAutomotriz(props: iListSede) {
  const { sedes } = props;

  const uniqueCites = [...new Set(sedes.map((item) => item.ciudad))].map(
    (ciudad, index) => ({ id: index + 1, ciudad })
  );

  return (
    <div className="max-w-7xl mx-auto py-6 md:py-10">
      <Tabs defaultValue="chiclayo" className="w-full ">
        <TabsList className="flex items-center p-5 w-fit mx-auto mb-5 gap-3">
          {uniqueCites.map(({ id, ciudad }) => (
            <TabsTrigger
              key={id}
              value={ciudad.toLowerCase()}
              className="capitalize"
            >
              {ciudad}
            </TabsTrigger>
          ))}
          {/* <TabsTrigger value="chiclayo">Chiclayo</TabsTrigger>
          <TabsTrigger value="chimbote">Chimbote</TabsTrigger>
          <TabsTrigger value="lima">Lima</TabsTrigger>
          <TabsTrigger value="trujillo">Trujillo</TabsTrigger> */}
        </TabsList>
        <div className="grid sm:grid-col-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-y-5 md:gap-x-6">
          {sedes.map((item) => (
            <TabsContent key={item._id} value={item.ciudad.toLowerCase()}>
              <CardUbicanos params={item} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
