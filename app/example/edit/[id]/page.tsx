'use client';

import Button from '@/app/general/components/Button';
import { IExample } from '@/app/redux/interfaces/general/example';
import StyledContainer from '@/app/general/components/StyledContainer';
import { exampleApi } from '@/app/redux/apis/ExampleApi';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';

export default function ItemsEdit() {
  const params = useParams();
  const { id } = params;
  const { data: response } = exampleApi.useGetItemQuery(String(id));
  const [updateItem] = exampleApi.useUpdateItemMutation();

  const { register, reset, handleSubmit } = useForm<IExample>();
  const onSubmit = (data: IExample) => {
    updateItem({
      id: data.id,
      name: data.name,
    });
  };

  useEffect(() => {
    if (response) {
      reset({
        id: response.data.id,
        name: response.data.name,
      });
    }
  }, [response]);

  return (
    <StyledContainer>
      <h1 className="text-2xl">Example məlumatlarını dəyiş</h1>
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

        <div className="w-full">
          <Button>Təsdiqlə</Button>
        </div>
      </form>
      </StyledContainer>
  );
}
