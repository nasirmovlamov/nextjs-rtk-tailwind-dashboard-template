'use client';
import Button from '@/app/general/components/Button';
import { corpsApi } from '@/app/redux/apis/CorpsApi';
import { ICorp } from '@/app/redux/interfaces/general/corps';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function CorpsEdit() {
  const params = useParams();
  const { id } = params;
  const { data: response } = corpsApi.useGetCorpQuery(String(id));
  const [updateCorp] = corpsApi.useUpdateCorpsMutation();
  const { register, reset, handleSubmit } = useForm();

  const onSubmit = (data: ICorp) => {
    updateCorp(data);
  };

  useEffect(() => {
    if (response) {
      reset(response.data);
    }
  }, [response]);

  return (
    <div className="flex flex-col bg-[#2b353dcd] w-full rounded p-4 text-white">
      <h1 className="text-2xl">Korpus məlumatlarını dəyiş</h1>
      <form className="flex flex-wrap gap-x-5 gap-y-4 mt-5" onSubmit={handleSubmit(onSubmit)}>
        {/* form group */}
        <div className="flex flex-col ">
          <label className="text-sm/6 font-medium text-white">Korpus Adı</label>
          <input
            required
            {...register('corpusName')}
            className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white"
          />
        </div>

        {/* form group */}
        <div className="flex flex-col ">
          <label className="text-sm/6 font-medium text-white">Korpus Kodu</label>
          <input
            required
            {...register('corpusSerialNumber')}
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
