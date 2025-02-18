'use client';

import { ActionButtonsForTable } from '../general/components/ActionButtonsForTable';
import { PaginationHandler } from '../general/components/PaginationHandler';
import TableSkeleton from '../general/components/TableSkeleton';
import { brigadesApi } from '../redux/apis/BrigadesApi';
import { useEffect } from 'react';

export default function Brigades() {
  const [getBrigades, { data: response, isLoading: isLoadingGetBrigades }] =
    brigadesApi.useLazyGetBrigadesQuery();
  const [deleteBrigade] = brigadesApi.useDeleteBrigadesMutation();

  const handleDeleteBrigade = async (id: string) => {
    await deleteBrigade(id);
  };

  useEffect(() => {
    getBrigades(1);
  }, []);

  return (
    <div className="relative flex flex-col w-full overflow-auto text-white bg-[#131313b2] shadow-md rounded-xl bg-clip-border">
      <TableSkeleton isLoading={isLoadingGetBrigades} rows={10}>
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
                <p className="block font-sans text-sm antialiased  leading-none font-bold ">
                  Bağlı olduğu korpus
                </p>
              </th>

              <th className="p-4  ">
                <p className="block font-sans text-sm antialiased  leading-none font-bold "></p>
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-300 font-thin">
            {response?.data?.data?.map((item) => (
              <tr key={item?.unitId}>
                <td className="min-w-56 p-4 border-b border-gray-600">
                  <p className="block">{item?.unitName}</p>
                </td>
                <td className="min-w-20 p-4 border-b border-gray-600">
                  <p className="block">{item?.unitSerialNumber}</p>
                </td>
                <td className="min-w-20 p-4 border-b border-gray-600">
                  <p className="block">{item?.corpusId}</p>
                </td>
                {/* <td className="p-4 border-b border-gray-600">
                <p className="block">23/04/18</p>
              </td> */}
                <td className="p-4 border-b border-gray-600">
                  <ActionButtonsForTable
                    path="brigades"
                    id={item.unitId}
                    deleteItem={handleDeleteBrigade}
                    actions={['view', 'edit', 'delete']}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableSkeleton>
      <PaginationHandler
        currentPage={Number(response?.data.currentPage)}
        totalPages={Number(response?.data.totalPages)}
        onPageChange={getBrigades}
      />
    </div>
  );
}
