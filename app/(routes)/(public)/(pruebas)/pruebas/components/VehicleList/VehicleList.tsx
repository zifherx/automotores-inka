/* eslint-disable @next/next/no-img-element */
import { iListModels } from "@/types";

type Props = iListModels & {
  showChasis: boolean;
};

export function VehicleList({ models, showChasis }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {models.map(
        ({
          _id,
          imageUrl,
          name,
          marca,
          carroceria,
          precioBase,
          isEntrega48H,
          isGLP,
          isLiquidacion,
          isNuevo,
        }) => (
          <div key={_id} className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{name}</h3>
              <p className="text-gray-600 mb-2">Marca: {marca.name}</p>
              {showChasis && (
                <p className="text-gray-600 mb-2">
                  Carrocería: {carroceria.name}
                </p>
              )}
              <p className="text-gray-600 mb-2">
                Precio: ${precioBase.toLocaleString()}
              </p>
              <div className="flex flex-wrap gap-2">
                {isEntrega48H && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Entrega 48H
                  </span>
                )}
                {isGLP && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    GLP
                  </span>
                )}
                {isLiquidacion && (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Liquidación
                  </span>
                )}
                {isNuevo && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Nuevo
                  </span>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
