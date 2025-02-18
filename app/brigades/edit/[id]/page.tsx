'use client';
import Button from '@/app/general/components/Button';
import { brigadesApi } from '@/app/redux/apis/BrigadesApi';
import { corpsApi } from '@/app/redux/apis/CorpsApi';
import { IUpdateBrigade } from '@/app/redux/interfaces/general/brigade';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function BrigadesEdit() {
  const params = useParams();
  const { id } = params;
  const { data: response } = brigadesApi.useGetBrigadeQuery(String(id));
  const [updateBrigade] = brigadesApi.useUpdateBrigadesMutation();
  const { data: responseCorps } = corpsApi.useGetCorpsQuery();

  const { register, reset, handleSubmit } = useForm<IUpdateBrigade>();
  const onSubmit = (data: IUpdateBrigade) => {
    updateBrigade({
      ...data,
      corpusId: Number(data.corpusId),
      unitSerialNumber: Number(data.unitSerialNumber),
    });
  };

  useEffect(() => {
    if (response) {
      reset({
        corpusId: Number(response.data.corpusId),
        id: Number(response.data.unitId),
        unitName: response.data.unitName,
        unitSerialNumber: Number(response.data.unitSerialNumber),
      });
    }
  }, [response]);

  return (
    <div className="flex flex-col bg-[#2b353dcd] w-full rounded p-4 text-white">
      <h1 className="text-2xl">Briqada məlumatlarını dəyiş</h1>
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
    </div>
  );
}
