import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeletonModel() {
  return (
    <div className="relative p-1 rounded-xl shadow-md bg-white border border-grisInka/55">
      <div className="relative">
        <Skeleton className="w-full h-[200px] rounded-xl" />
        <Skeleton className="absolute top-2 left-2 w-[100px] h-[50px]" />
      </div>
      <div className="flex justify-end mr-5 mt-1">
        <Skeleton className="w-24 h-3" />
      </div>
      <div className="p-4">
        <div className="flex justify-between gap-5">
          <div className="space-y-2">
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-28 h-6" />
          </div>
          <div className="h-fit">
            <Skeleton className="w-[100px] h-[50px]" />
          </div>
        </div>
        <Skeleton className="w-16 h-4 mt-5" />
        <Skeleton className="w-full h-8 mt-3" />
        <Skeleton className="w-full h-10 mt-8 rounded-2xl" />
      </div>
    </div>
  );
}
