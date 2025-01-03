"use client";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Card, CardContent } from "@/components/ui/card";
import { MarkerLocation } from "../MarkerLocation";

import { iSede, tLocationMap } from "@/types";

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, 15);
  return null;
}

export function Mapa({ sedes, mapCenter }: tLocationMap) {
  const urlCartoon =
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png";
  const urlStreetMap = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <Card className="md:col-span-2">
      <CardContent className="p-0">
        <div className="h-[750px] w-full rounded-lg overflow-hidden">
          <MapContainer
            center={mapCenter}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url={urlStreetMap} />

            {sedes.map((dealer: iSede) => (
              <MarkerLocation key={dealer._id} sede={dealer} />
            ))}
            <MapController center={mapCenter} />
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}
