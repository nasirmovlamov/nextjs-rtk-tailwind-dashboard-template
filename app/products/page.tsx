'use client';

import { ActionButtonsForTable } from '../general/components/ActionButtonsForTable';
import { PaginationHandler } from '../general/components/PaginationHandler';
import TableSkeleton from '../general/components/TableSkeleton';
import { productsApi } from '../redux/apis/ProductsApi';
import { useEffect } from 'react';

export default function Products() {
  const [getProducts, { data: response, isLoading: isLoadingGetProducts }] =
    productsApi.useLazyGetProductsQuery();
  const [deleteProduct] = productsApi.useDeleteProductMutation();

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
  };

  useEffect(() => {
    getProducts(1);
  }, []);

  return (
    <div className="relative flex flex-col w-full overflow-auto text-white bg-[#131313b2] shadow-md rounded-xl bg-clip-border">
      <TableSkeleton isLoading={isLoadingGetProducts} rows={10}>
        <table className="w-full text-left table-auto min-w-max">
          <thead className="bg-[#131313d8]">
            <tr>
              <th className="p-4 ">
                <p className="block font-sans text-sm antialiased  leading-none font-bold ">Adı</p>
              </th>
              <th className="p-4  ">
                <p className="block font-sans text-sm antialiased  leading-none font-bold ">
                  Ölçüsü
                </p>
              </th>

              <th className="p-4  ">
                <p className="block font-sans text-sm antialiased  leading-none font-bold ">
                  Qrupu
                </p>
              </th>

              <th className="p-4  ">
                <p className="block font-sans text-sm antialiased  leading-none font-bold ">
                  Əlavə edilib
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
                  <p className="block">{item?.name}</p>
                </td>
                <td className="p-4 border-b border-gray-600">
                  <p className="block">{item?.size}</p>
                </td>

                <td className="p-4 border-b border-gray-600">
                  <p className="block">{item?.groupName}</p>
                </td>

                <td className="p-4 border-b border-gray-600">
                  <ActionButtonsForTable
                    path="products"
                    actions={['view', 'edit', 'delete']}
                    id={item.id}
                    deleteItem={handleDeleteProduct}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationHandler
          currentPage={Number(response?.data.currentPage)}
          totalPages={Number(response?.data.totalPages)}
          onPageChange={getProducts}
        />
      </TableSkeleton>
    </div>
  );
}
