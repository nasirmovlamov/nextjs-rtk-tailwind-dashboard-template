'use client';
import { corpsApi } from '@/app/redux/apis/CorpsApi';
import { useParams } from 'next/navigation';

export default function CorpsView() {
  const params = useParams();
  const { id } = params;
  const { data: response } = corpsApi.useGetCorpQuery(id);

  return (
    <div className="flex flex-col bg-[#2b353dcd] w-full rounded p-4 text-white">
      <h1 className="text-2xl">Korpus məlumatları</h1>
      <form className="flex flex-wrap gap-x-5 gap-y-4 mt-5">
        {/* form group */}
        <div className="flex flex-col w-48">
          <label className="text-sm/6 font-medium text-white">Korpus Adı</label>
          <div className=" mt-3 block rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white">
            {response?.data.corpusName}
          </div>
        </div>

        {/* form group */}
        <div className="flex flex-col w-48">
          <label className="text-sm/6 font-medium text-white">Korpus Kodu</label>
          <div className=" mt-3 block rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white">
            {response?.data.corpusSerialNumber}
          </div>
        </div>
      </form>
    </div>
  );
}
