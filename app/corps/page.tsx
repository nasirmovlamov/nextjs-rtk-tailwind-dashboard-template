"use client";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { corpsApi } from "../redux/apis/CorpsApi";
import TableSkeleton from "../general/components/TableSkeleton";
import { useRouter } from "next/navigation";

export default function Coprs() {
  const router = useRouter();
  const { data: response, isLoading: isLoadingGetCorps } =
    corpsApi.useGetCorpsQuery();
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
                  <div className="flex gap-x-4">
                    <button
                      className="w-5 h-5 "
                      onClick={() => {
                        router.push(`/corps/view/${item?.id}`);
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
                        router.push(`/corps/edit/${item?.id}`);
                      }}
                    >
                      <PencilIcon
                        fontSize="15px"
                        color="white"
                        className="hover:text-gray-600 transition-all"
                      />
                    </button>
                    <button
                      onClick={() => handleDeleteCorp(String(item?.id))}
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
    </div>
  );
}
