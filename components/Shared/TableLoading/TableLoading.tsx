import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableRowSkeleton = () => (
  <TableRow className="animate-pulse">
    {[...Array(4)].map((_, i) => (
      <TableCell key={i} className="py-4">
        <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-1/2"></div>
      </TableCell>
    ))}
  </TableRow>
);

export function TableLoading() {
  return (
    <div className="rounded-md border relative overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {[
              ...Array(4).map((_, i) => (
                <TableHead key={i} className="py-4">
                  <div className="h-4 bg-gray-100 rounded dark:bg-gray-800 w-1/2"></div>
                </TableHead>
              )),
            ]}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(6)].map((_, i) => (
            <TableRowSkeleton key={i} />
          ))}
        </TableBody>
      </Table>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-900 shimmer"></div>
    </div>
  );
}
