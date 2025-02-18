'use client';
import { useEffect } from 'react';
import { ActionButtonsForTable } from '../general/components/ActionButtonsForTable';
import { PaginationHandler } from '../general/components/PaginationHandler';
import TableSkeleton from '../general/components/TableSkeleton';
import { exampleApi } from '../redux/apis/ExampleApi';

export default function Example() {
  const [getItems, { data: response, isLoading: isLoadingGetItems }] =
    exampleApi.useLazyGetItemsQuery();
  const [deleteItem] = exampleApi.useDeleteItemMutation();

  const handleDeleteItem = async (id: string) => {
    await deleteItem(id);
  };

  useEffect(() => {
    getItems(1);
  }, []);

  return (
    <div className="relative flex flex-col w-full overflow-auto text-white bg-[#2b353dcd] shadow-md rounded-xl bg-clip-border">
      <TableSkeleton isLoading={isLoadingGetItems} rows={10}>
        <table className="w-full text-left table-auto min-w-max">
          <thead className="bg-[#2b353df7]">
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
                    path="example"
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
