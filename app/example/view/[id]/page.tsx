'use client';
import { DataMapper } from '@/app/general/components/DataMapper';
import { exampleApi } from '@/app/redux/apis/ExampleApi';
import { useParams } from 'next/navigation';

export default function ItemsView() {
  const params = useParams();
  const { id } = params;
  const { data: response } = exampleApi.useGetItemQuery(String(id));

  return (
    <div className="flex flex-col bg-[#2b353dcd] w-full rounded p-4 text-white">
      <h1 className="text-2xl">Example məlumatları</h1>
      <DataMapper data={[]} />
    </div>
  );
}
