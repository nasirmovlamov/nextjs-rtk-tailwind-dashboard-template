'use client';
import Button from '@/app/general/components/Button';
import { productsApi } from '@/app/redux/apis/ProductsApi';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IProduct } from '@/app/redux/interfaces/general/product';
import { groupsApi } from '@/app/redux/apis/GroupsApi';

export default function ProductsEdit() {
  const params = useParams();
  const { id } = params;
  const { data: response } = productsApi.useGetProductQuery(String(id));
  const { data: groupsResponse } = groupsApi.useGetGroupsAllQuery();
  const [updateProduct] = productsApi.useUpdateProductMutation();

  const { register, reset, handleSubmit } = useForm<IProduct>();
  const onSubmit = (data: IProduct) => {
    updateProduct({
      id: data.id,
      name: data.name,
      size: data.size,
      groupId: data.groupId,
    });
  };

  useEffect(() => {
    if (response) {
      reset({
        id: response.data.id,
        name: response.data.name,
        size: response.data.size,
        groupId: response.data.groupId,
      });
    }
  }, [response]);

  return (
    <div className="flex flex-col bg-[#2b353dcd] w-full rounded p-4 text-white">
      <h1 className="text-2xl">Qrup məlumatlarını dəyiş</h1>
      <form className="flex flex-wrap gap-x-5 gap-y-4 mt-5" onSubmit={handleSubmit(onSubmit)}>
        {/* form product */}
        <div className="flex flex-col ">
          <label className="text-sm/6 font-medium text-white">Adı</label>
          <input
            required
            {...register('name')}
            className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white"
          />
        </div>

        {/* form product */}
        <div className="flex flex-col ">
          <label className="text-sm/6 font-medium text-white">Ölçüsü</label>
          <input
            required
            {...register('size')}
            className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white"
          />
        </div>

        {/* form product */}
        <div className="flex flex-col ">
          <label className="text-sm/6 font-medium text-white">Bağlı olduğu qrup</label>
          <select
            required
            {...register('groupId', {
              required: true,
            })}
            className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white"
          >
            {groupsResponse?.data?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.groupName}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <Button>Təsdiqlə</Button>
        </div>
      </form>
    </div>
  );
}
