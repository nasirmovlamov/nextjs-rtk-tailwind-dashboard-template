'use client';
import { productsApi } from '@/app/redux/apis/ProductsApi';
import { useParams } from 'next/navigation';

export default function ProductsView() {
  const params = useParams();
  const { id } = params;
  const { data: response } = productsApi.useGetProductQuery(String(id));

  return (
    <div className="flex flex-col bg-[#2b353dcd] w-full rounded p-4 text-white">
      <h1 className="text-2xl">Vəsait məlumatları</h1>
      <form className="flex flex-wrap gap-x-5 gap-y-4 mt-5">
        {/* form product */}
        <div className="flex flex-col w-48">
          <label className="text-sm/6 font-medium text-white">Vəsait Adı</label>
          <div className=" mt-3 block rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white">
            {response?.data.name}
          </div>
        </div>

        {/* form product */}
        <div className="flex flex-col w-48">
          <label className="text-sm/6 font-medium text-white">Vəsait Ölçüsü</label>
          <div className=" mt-3 block rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white">
            {response?.data.size}
          </div>
        </div>

        {/* form product */}
        <div className="flex flex-col w-48">
          <label className="text-sm/6 font-medium text-white">Bağlı olduğu qrup</label>
          <div className=" mt-3 block rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white">
            {response?.data.groupName}
          </div>
        </div>
      </form>
    </div>
  );
}
