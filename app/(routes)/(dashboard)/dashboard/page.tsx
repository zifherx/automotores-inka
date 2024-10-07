import { DashboardIndicators } from "./components/DashboardIndicators/index.ts/DashboardIndicators";

export default function DashboardPage() {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      </div>
      <DashboardIndicators />
      {/* <GraphicCars /> */}
      {/* <ListCars /> */}
    </>
  );
}
