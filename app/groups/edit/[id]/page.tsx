'use client';
import Button from '@/app/general/components/Button';
import { groupsApi } from '@/app/redux/apis/GroupsApi';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IGroup } from '@/app/redux/interfaces/general/group';

export default function GroupsEdit() {
  const params = useParams();
  const { id } = params;
  const { data: response } = groupsApi.useGetGroupQuery(String(id));
  const [updateGroup] = groupsApi.useUpdateGroupMutation();

  const { register, reset, handleSubmit } = useForm<IGroup>();
  const onSubmit = (data: IGroup) => {
    updateGroup({
      id: data.id,
      groupName: data.groupName,
      groupSerialNumber: Number(data.groupSerialNumber),
    });
  };

  useEffect(() => {
    if (response) {
      reset({
        id: response.data.id,
        groupName: response.data.groupName,
        groupSerialNumber: Number(response.data.groupSerialNumber),
      });
    }
  }, [response]);

  return (
    <div className="flex flex-col bg-[#2b353dcd] w-full rounded p-4 text-white">
      <h1 className="text-2xl">Qrup məlumatlarını dəyiş</h1>
      <form className="flex flex-wrap gap-x-5 gap-y-4 mt-5" onSubmit={handleSubmit(onSubmit)}>
        {/* form group */}
        <div className="flex flex-col ">
          <label className="text-sm/6 font-medium text-white">Qrup Adı</label>
          <input
            required
            {...register('groupName')}
            className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white"
          />
        </div>

        {/* form group */}
        <div className="flex flex-col ">
          <label className="text-sm/6 font-medium text-white">Qrup Kodu</label>
          <input
            required
            {...register('groupSerialNumber')}
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
