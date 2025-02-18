'use client';

import StyledContainer from '@/app/general/components/StyledContainer';
import { groupsApi } from '@/app/redux/apis/GroupsApi';
import { useParams } from 'next/navigation';

export default function GroupsView() {
  const params = useParams();
  const { id } = params;
  const { data: response } = groupsApi.useGetGroupQuery(String(id));

  return (
    <StyledContainer>
      <h1 className="text-2xl">Qrup məlumatları</h1>
      <form className="flex flex-wrap gap-x-5 gap-y-4 mt-5">
        {/* form group */}
        <div className="flex flex-col w-48">
          <label className="text-sm/6 font-medium text-white">Qrup Adı</label>
          <div className=" mt-3 block rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white">
            {response?.data.groupName}
          </div>
        </div>

        {/* form group */}
        <div className="flex flex-col w-48">
          <label className="text-sm/6 font-medium text-white">Qrup Kodu</label>
          <div className=" mt-3 block rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white">
            {response?.data.groupSerialNumber}
          </div>
        </div>
      </form>
    </StyledContainer>
  );
}
