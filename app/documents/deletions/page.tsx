'use client';

import { ActionButtonsForTable } from '@/app/general/components/ActionButtonsForTable';
import { PaginationHandler } from '@/app/general/components/PaginationHandler';
import TableSkeleton from '@/app/general/components/TableSkeleton';
import { documentsApi } from '@/app/redux/apis/DocumentsApi';
import { useEffect } from 'react';

export default function Documents() {
  const [getItems, { data: response, isLoading: isLoadingGetItems }] =
    documentsApi.useLazyGetItemsQuery();
  const [deleteItem] = documentsApi.useDeleteItemMutation();

  const handleDeleteItem = async (id: string) => {
    await deleteItem(id);
  };

  useEffect(() => {
    getItems(1);
  }, []);

  return (
    <div className="relative flex flex-col w-full overflow-auto text-white bg-[#131313b2] shadow-md rounded-xl bg-clip-border">
      <TableSkeleton isLoading={isLoadingGetItems} rows={10}>
        <table className="w-full text-left table-auto min-w-max">
          <thead className="bg-[#131313d8]">
            <tr>
              <th className="p-4  ">
                <p className="block font-sans text-sm antialiased  leading-none font-bold ">Adı</p>
              </th>
              <th className="p-4  ">
                <p className="block font-sans text-sm antialiased  leading-none font-bold ">Kodu</p>
              </th>

              <th className="p-4  ">
                <p className="block font-sans text-sm antialiased  leading-none font-bold ">-</p>
              </th>

              <th className="p-4  ">
                <p className="block font-sans text-sm antialiased  leading-none font-bold "></p>
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-300 font-thin">
            {response?.data?.data?.map((item) => (
              <tr key={item?.id}>
                <td className="p-4 border-b border-gray-600">
                  <p className="block">{item?.id}</p>
                </td>
                <td className="p-4 border-b border-gray-600">
                  <p className="block">{item?.name}</p>
                </td>
                {/* <td className="p-4 border-b border-gray-600">
                <p className="block">23/04/18</p>
              </td> */}
                <td className="p-4 border-b border-gray-600">
                  <ActionButtonsForTable
                    path="documents"
                    actions={['view', 'edit', 'delete']}
                    id={item.id}
                    deleteItem={handleDeleteItem}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationHandler
          currentPage={Number(response?.data.currentPage)}
          totalPages={Number(response?.data.totalPages)}
          onPageChange={getItems}
        />
      </TableSkeleton>
    </div>
  );
}
