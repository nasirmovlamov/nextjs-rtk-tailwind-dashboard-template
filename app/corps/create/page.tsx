'use client';

import Button from '@/app/general/components/Button';
import { ICorp } from '@/app/redux/interfaces/general/corps';
import StyledContainer from '@/app/general/components/StyledContainer';
import { corpsApi } from '@/app/redux/apis/CorpsApi';
import { useForm } from 'react-hook-form';

export default function CorpsCreate() {
  const [createCorp] = corpsApi.useCreateCorpsMutation();
  const { handleSubmit, register } = useForm<Omit<ICorp, 'id'>>();
  const onSubmit = (data: Omit<ICorp, 'id'>) => {
    createCorp({
      corpusName: data.corpusName,
      corpusSerialNumber: Number(data.corpusSerialNumber),
    });
  };
  return (
    <StyledContainer>
      <h1 data-testid="corps-title" className="text-2xl">
        Korpus əlavə et
      </h1>
      <form className="flex flex-wrap gap-x-5 gap-y-4 mt-5" onSubmit={handleSubmit(onSubmit)}>
        {/* form group */}
        <div className="flex flex-col ">
          <label className="text-sm/6 font-medium text-white">Korpus Adı</label>
          <input
            required
            data-testid="input-corpusname"
            {...register('corpusName')}
            className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white"
          />
        </div>

        {/* form group */}
        <div className="flex flex-col ">
          <label className="text-sm/6 font-medium text-white">Korpus Kodu</label>
          <input
            data-testid="input-corpusserialnumber"
            required
            {...register('corpusSerialNumber')}
            className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white"
          />
        </div>

        <div className="w-full">
          <Button data-testid="button-submit">Təsdiqlə</Button>
        </div>
      </form>
    </StyledContainer>
  );
}
