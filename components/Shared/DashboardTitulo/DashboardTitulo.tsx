import { tLayoutContentTitle } from "@/types";

export function DashboardTitulo({ titulo, qty }: tLayoutContentTitle) {
  return (
    <h2 className="text-xl md:text-3xl font-headMedium">
      {titulo} - {qty}
    </h2>
  );
}
