'use client';
import { usersApi } from '@/app/redux/apis/UsersApi';
import { useParams } from 'next/navigation';

export default function UsersView() {
  const params = useParams();
  const { id } = params;
  const { data: response } = usersApi.useGetItemQuery(String(id));

  return (
    <div className="flex flex-col bg-[#2b353dcd] w-full rounded p-4 text-white">
      <h1 className="text-2xl">İstifadəçi məlumatları</h1>
      <form className="flex flex-wrap gap-x-5 gap-y-4 mt-5">
        {/* form user */}
        <div className="flex flex-col w-48">
          <label className="text-sm/6 font-medium text-white">İstifadəçi adı</label>
          <div className=" mt-3 block rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white">
            {response?.data?.username}
          </div>
        </div>

        {/* form user */}
        <div className="flex flex-col w-48">
          <label className="text-sm/6 font-medium text-white">Elektron poçt</label>
          <div className=" mt-3 block rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white">
            {response?.data?.email}
          </div>
        </div>
      </form>
    </div>
  );
}
