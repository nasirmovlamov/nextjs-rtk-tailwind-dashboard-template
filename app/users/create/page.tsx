'use client';

import Button from '@/app/general/components/Button';
import { IUser } from '@/app/redux/interfaces/general/user';
import StyledContainer from '@/app/general/components/StyledContainer';
import { useForm } from 'react-hook-form';
import { usersApi } from '@/app/redux/apis/UsersApi';

export default function ItemsCreate() {
  const [createItem] = usersApi.useCreateItemMutation();
  const { handleSubmit, register } = useForm<Omit<IUser, 'id'>>();
  const onSubmit = (data: Omit<IUser, 'id' | 'roles'>) => {
    createItem({
      username: data.username,
      email: data.email,
    });
  };
  return (
    <StyledContainer>
      <h1 className="text-2xl">İstifadəçi əlavə et</h1>
      <form className="flex flex-wrap gap-x-5 gap-y-4 mt-5" onSubmit={handleSubmit(onSubmit)}>
        {/* form product */}
        <div className="flex flex-col ">
          <label className="text-sm/6 font-medium text-white"> Adı</label>
          <input
            required
            {...register('username', {
              required: true,
            })}
            className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white"
          />
        </div>

        {/* form product */}
        <div className="flex flex-col ">
          <label className="text-sm/6 font-medium text-white">Elektron poçt</label>
          <input
            type="email"
            required
            {...register('email', {
              required: true,
            })}
            className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white"
          />
        </div>

        <div className="w-full">
          <Button>Təsdiqlə</Button>
        </div>
      </form>
    </StyledContainer>
  );
}
