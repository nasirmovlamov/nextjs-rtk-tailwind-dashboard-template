"use client";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import TableSkeleton from "../general/components/TableSkeleton";
import { useRouter } from "next/navigation";
import { brigadesApi } from "../redux/apis/BrigadesApi";
import { PaginationHandler } from "../general/components/PaginationHandler";
import { useEffect } from "react";

export default function Brigades() {
  const router = useRouter();

  const [getBrigades, { data: response, isLoading: isLoadingGetBrigades }] =
    brigadesApi.useLazyGetBrigadesQuery();
  const [deleteBrigade] = brigadesApi.useDeleteBrigadesMutation();

  const handleDeleteBrigade = async (id: string) => {
    await deleteBrigade(id);
  };

  useEffect(() => {
    getBrigades();
  }, []);

  return (
    <div className="relative flex flex-col w-full overflow-auto text-white bg-[#2b353dcd] shadow-md rounded-xl bg-clip-border">
      <TableSkeleton isLoading={isLoadingGetBrigades} rows={10}>
        <table className="w-full text-left table-auto min-w-max">
          <thead className="bg-[#2b353df7]">
            <tr>
              <th className="p-4  ">
                <p className="block font-sans text-sm antialiased  leading-none font-bold ">
                  Adı
                </p>
              </th>
              <th className="p-4  ">
                <p className="block font-sans text-sm antialiased  leading-none font-bold ">
                  Kodu
                </p>
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
                  <div className="flex gap-x-4">
                    <button
                      className="w-5 h-5 "
                      onClick={() => {
                        router.push(`/brigades/view/${item?.unitId}`);
                      }}
                    >
                      <EyeIcon
                        fontSize="15px"
                        color="white"
                        className="hover:text-gray-600 transition-all"
                      />
                    </button>
                    <button
                      className="w-5 h-5"
                      onClick={() => {
                        router.push(`/brigades/edit/${item?.unitId}`);
                      }}
                    >
                      <PencilIcon
                        fontSize="15px"
                        color="white"
                        className="hover:text-gray-600 transition-all"
                      />
                    </button>
                    <button
                      onClick={() => handleDeleteBrigade(String(item?.unitId))}
                      className="w-5 h-5"
                    >
                      <TrashIcon
                        fontSize="15px"
                        color="white"
                        className="hover:text-gray-600 transition-all"
                      />
                    </button>
                  </div>
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
