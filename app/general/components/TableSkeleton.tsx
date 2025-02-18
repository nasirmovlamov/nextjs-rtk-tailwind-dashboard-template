'use client';

export default function TableSkeleton({
  rows = 5,
  columns = 4,
  children,
  isLoading = false,
}: {
  rows?: number;
  columns?: number;
  children: React.ReactNode;
  isLoading: boolean;
}) {
  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg">
      {isLoading && (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="p-3 bg-gray-700 border border-gray-500">
                  <div className="h-4 w-24 bg-gray-500 animate-pulse rounded"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i}>
                {Array.from({ length: columns }).map((_, j) => (
                  <td key={j} className="p-3 border border-gray-700">
                    <div className="h-4 w-full bg-gray-500 animate-pulse rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!isLoading && <>{children}</>}
    </div>
  );
}
