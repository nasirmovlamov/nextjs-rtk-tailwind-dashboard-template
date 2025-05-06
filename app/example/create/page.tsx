'use client';

import Button from '@/app/general/components/Button';
import { INaryad } from '@/app/redux/interfaces/general/documents';
import StyledContainer from '@/app/general/components/StyledContainer';
import { shiftApi } from '@/app/redux/apis/ShiftApi';
import { useForm } from 'react-hook-form';

export default function ShiftCreate() {
  const [createShift] = shiftApi.useCreateShiftMutation();
  const { handleSubmit, register } = useForm<Omit<INaryad, 'orderNumber'>>();

  const onSubmit = (data: Omit<INaryad, 'orderNumber'>) => {
    createShift(data);
  };

  return (
    <StyledContainer>
      <h1 className="text-2xl">Create Shift</h1>
      <form className="flex flex-wrap gap-x-5 gap-y-4 mt-5" onSubmit={handleSubmit(onSubmit)}>
        {[
          'validUntil',
          'registrationNumber',
          'pageNumber',
          'documentNumber',
          'documentDate',
          'purpose',
          'operationDate',
          'organization',
          'senderId',
          'receiverId',
          'novuId',
          'transportationType',
          'transportationDocumentName',
          'transportationNumber',
          'transportationDocumentNumber',
          'executionDate',
          'isExecuted',
          'note',
        ].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-sm font-medium text-white">
              {field.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <input
              required
              {...register(field as keyof Omit<INaryad, 'orderNumber'>, { required: true })}
              className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm text-white"
            />
          </div>
        ))}
        <div className="w-full">
          <Button>Create Shift</Button>
        </div>
      </form>
    </StyledContainer>
  );
}
