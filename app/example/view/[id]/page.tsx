'use client';

import { DataMapper } from '@/app/general/components/DataMapper';
import StyledContainer from '@/app/general/components/StyledContainer';
import { exampleApi } from '@/app/redux/apis/ExampleApi';
import { useParams } from 'next/navigation';

export default function ItemsView() {
  const params = useParams();
  const { id } = params;
  const { data: response } = exampleApi.useGetItemQuery(String(id));

  return (
    <StyledContainer>
      <h1 className="text-2xl">Example məlumatları</h1>
      <DataMapper data={[]} />
    </StyledContainer>
  );
}
