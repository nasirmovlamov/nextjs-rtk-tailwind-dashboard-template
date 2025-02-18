'use client';
import Button from '@/app/general/components/Button';
import { groupsApi } from '@/app/redux/apis/GroupsApi';
import { productsApi } from '@/app/redux/apis/ProductsApi';
import { IProduct } from '@/app/redux/interfaces/general/product';
import { useForm } from 'react-hook-form';

export default function ProductsCreate() {
  const [createProduct] = productsApi.useCreateProductMutation();
  const { data: groupsResponse } = groupsApi.useGetGroupsAllQuery();
  const { handleSubmit, register } = useForm<Omit<IProduct, 'id'>>();
  const onSubmit = (data: Omit<IProduct, 'id' | 'groupName'>) => {
    createProduct({
      name: data.name,
      size: data.size,
      groupId: data.groupId,
    });
  };
  return (
    <div className="flex flex-col bg-[#2b353dcd] w-full rounded p-4 text-white">
      <h1 className="text-2xl">Vəsait əlavə et</h1>
      <form className="flex flex-wrap gap-x-5 gap-y-4 mt-5" onSubmit={handleSubmit(onSubmit)}>
        {/* form product */}
        <div className="flex flex-col ">
          <label className="text-sm/6 font-medium text-white">Vəsait Adı</label>
          <input
            required
            {...register('name', {
              required: true,
            })}
            className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white"
          />
        </div>

        {/* form product */}
        <div className="flex flex-col ">
          <label className="text-sm/6 font-medium text-white">Vəsait Ölçüsü</label>
          <input
            required
            {...register('size', {
              required: true,
            })}
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
