'use client';
import Button from '@/app/general/components/Button';
import { exampleApi } from '@/app/redux/apis/ExampleApi';
import { IExample } from '@/app/redux/interfaces/general/example';
import { useForm } from 'react-hook-form';

export default function ItemsCreate() {
  const [createItem] = exampleApi.useCreateItemMutation();
  const { handleSubmit, register } = useForm<Omit<IExample, 'id'>>();
  const onSubmit = (data: Omit<IExample, 'id'>) => {
    createItem({
      name: data.name,
    });
  };
  return (
    <div className="flex flex-col bg-[#2b353dcd] w-full rounded p-4 text-white">
      <h1 className="text-2xl">Example əlavə et</h1>
      <form className="flex flex-wrap gap-x-5 gap-y-4 mt-5" onSubmit={handleSubmit(onSubmit)}>
        {/* form product */}
        <div className="flex flex-col ">
          <label className="text-sm/6 font-medium text-white"> Adı</label>
          <input
            required
            {...register('name', {
              required: true,
            })}
            className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white"
          />
        </div>

        <div className="w-full">
          <Button>Təsdiqlə</Button>
        </div>
      </form>
    </div>
  );
}
