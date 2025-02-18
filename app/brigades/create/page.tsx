'use client';

import Button from '@/app/general/components/Button';
import { ICreateBrigade } from '@/app/redux/interfaces/general/brigade';
import StyledContainer from '@/app/general/components/StyledContainer';
import { brigadesApi } from '@/app/redux/apis/BrigadesApi';
import { corpsApi } from '@/app/redux/apis/CorpsApi';
import { useForm } from 'react-hook-form';

export default function BrigadesCreate() {
  const [createBrigade] = brigadesApi.useCreateBrigadesMutation();
  const { data: responseCorps } = corpsApi.useGetCorpsQuery();
  const { handleSubmit, register } = useForm<ICreateBrigade>();

  const onSubmit = (data: ICreateBrigade) => {
    createBrigade({
      ...data,
      corpusId: Number(data.corpusId),
      unitSerialNumber: Number(data.unitSerialNumber),
    });
  };

  return (
    <StyledContainer>
      <h1 className="text-2xl">Korpus əlavə et</h1>
      <form className="flex flex-wrap gap-x-5 gap-y-4 mt-5" onSubmit={handleSubmit(onSubmit)}>
        {/* form group */}
        <div className="flex flex-col ">
          <label className="text-sm/6 font-medium text-white">Briqada Adı</label>
          <input
            required
            {...register('unitName')}
            className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white"
          />
        </div>

        {/* form group */}
        <div className="flex flex-col ">
          <label className="text-sm/6 font-medium text-white">Briqada Kodu</label>
          <input
            required
            {...register('unitSerialNumber')}
            className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white"
          />
        </div>

        {/* form group */}
        <div className="flex flex-col w-48">
          <label className="text-sm/6 font-medium text-white">Bağlı olduğu korpus</label>
          <select
            required
            {...register('corpusId')}
            className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white"
          >
            {responseCorps?.data.map((item) => {
              return (
                <option className="text-black" key={item.id} value={item.id}>
                  {item.corpusName}
                </option>
              );
            })}
          </select>
        </div>

        <div className="w-full">
          <Button>Təsdiqlə</Button>
        </div>
      </form>
    </StyledContainer>
  );
}
