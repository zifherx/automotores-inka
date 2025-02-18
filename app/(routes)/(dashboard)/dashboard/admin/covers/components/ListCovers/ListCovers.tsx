"use client";

import { useCovers } from "@/context/covers/coverContext";
import { TableLoading } from "@/components/Shared/TableLoading";

import { CardCover } from "../CardCover";

export function ListCovers() {
  const { covers, isLoadingData } = useCovers();

  if (isLoadingData) {
    return <TableLoading />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-2 md:p-5">
      {covers.length === 0 ? (
        <p className="text-center text-2xl font-textRegular col-span-4">
          No existen registros
        </p>
      ) : (
        covers.map((item) => <CardCover key={item._id} cover={item} />)
      )}
    </div>
  );
}
