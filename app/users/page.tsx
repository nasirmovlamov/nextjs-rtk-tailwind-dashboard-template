'use client';
import { useEffect } from 'react';
import { ActionButtonsForTable } from '../general/components/ActionButtonsForTable';
import { PaginationHandler } from '../general/components/PaginationHandler';
import TableSkeleton from '../general/components/TableSkeleton';
import { usersApi } from '../redux/apis/UsersApi';

export default function Users() {
  const [getUsers, { data: response, isLoading: isLoadingGetUsers }] =
    usersApi.useLazyGetItemsQuery();
  const [deleteUsers] = usersApi.useDeleteItemMutation();

  const handleDeleteUsers = async (id: string) => {
    await deleteUsers(id);
  };

  useEffect(() => {
    getUsers(1);
  }, []);

  return (
    <div className="relative flex flex-col w-full overflow-auto text-white bg-[#2b353dcd] shadow-md rounded-xl bg-clip-border">
      <TableSkeleton isLoading={isLoadingGetUsers} rows={10}>
        <table className="w-full text-left table-auto min-w-max">
          <thead className="bg-[#2b353df7]">
            <tr>
              <th className="p-4 ">
                <p className="block font-sans text-sm antialiased  leading-none font-bold ">
                  İstifadəçi Adı
                </p>
              </th>

              <th className="p-4  ">
                <p className="block font-sans text-sm antialiased  leading-none font-bold ">
                  Elektron poçt
                </p>
              </th>

              <th className="p-4">
                <p className="block font-sans text-sm antialiased  leading-none font-bold "></p>
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-300 font-thin">
            {response?.data?.data?.map((item) => (
              <tr key={item?.id}>
                <td className="p-4 border-b border-gray-600">
                  <p className="block">{item?.username}</p>
                </td>
                <td className="p-4 border-b border-gray-600">
                  <p className="block">{item?.email}</p>
                </td>

                <td className="p-4 border-b border-gray-600">
                  <ActionButtonsForTable
                    path="users"
                    id={item.id}
                    actions={['view', 'delete']}
                    deleteItem={handleDeleteUsers}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationHandler
          currentPage={Number(response?.data.currentPage)}
          totalPages={Number(response?.data.totalPages)}
          onPageChange={getUsers}
        />
      </TableSkeleton>
    </div>
  );
}
