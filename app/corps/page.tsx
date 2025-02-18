'use client';
import { ActionButtonsForTable } from '../general/components/ActionButtonsForTable';
import TableSkeleton from '../general/components/TableSkeleton';
import { corpsApi } from '../redux/apis/CorpsApi';

export default function Coprs() {
  const { data: response, isLoading: isLoadingGetCorps } = corpsApi.useGetCorpsQuery();
  const [deleteCorp] = corpsApi.useDeleteCorpsMutation();

  const handleDeleteCorp = async (id: string) => {
    await deleteCorp(id);
  };
  return (
    <div className="relative flex flex-col w-full overflow-auto text-white bg-[#2b353dcd] shadow-md rounded-xl bg-clip-border">
      <TableSkeleton isLoading={isLoadingGetCorps} rows={10}>
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
                <p className="block font-sans text-sm antialiased  leading-none font-bold ">
                  Əlavə edilib
                </p>
              </th>

              <th className="p-4  ">
                <p className="block font-sans text-sm antialiased  leading-none font-bold "></p>
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-300 font-thin">
            {response?.data.map((item) => (
              <tr key={item?.id}>
                <td className="p-4 border-b border-gray-600">
                  <p className="block">{item?.corpusName}</p>
                </td>
                <td className="p-4 border-b border-gray-600">
                  <p className="block">{item?.corpusSerialNumber}</p>
                </td>
                {/* <td className="p-4 border-b border-gray-600">
                <p className="block">23/04/18</p>
              </td> */}
                <td className="p-4 border-b border-gray-600">
                  <ActionButtonsForTable
                    path="corps"
                    id={item.id}
                    deleteItem={handleDeleteCorp}
                    actions={['view', 'edit', 'delete']}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableSkeleton>
    </div>
  );
}
