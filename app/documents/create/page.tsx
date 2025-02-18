'use client';

import Button from '@/app/general/components/Button';
import { IDocuments } from '@/app/redux/interfaces/general/documents';
import StyledContainer from '@/app/general/components/StyledContainer';
import { documentsApi } from '@/app/redux/apis/DocumentsApi';
import { useForm } from 'react-hook-form';

export default function ItemsCreate() {
  const [createItem] = documentsApi.useCreateItemMutation();
  const { handleSubmit, register } = useForm<Omit<IDocuments, 'id'>>();
  const onSubmit = (data: Omit<IDocuments, 'id'>) => {
    createItem({
      name: data.name,
    });
  };
  return (
    <StyledContainer>
      <h1 className="text-2xl">Documents əlavə et</h1>
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
    </StyledContainer>
  );
}
