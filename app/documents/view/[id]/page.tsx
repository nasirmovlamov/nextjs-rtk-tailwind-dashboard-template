'use client';

import { DataMapper } from '@/app/general/components/DataMapper';
import StyledContainer from '@/app/general/components/StyledContainer';
import { documentsApi } from '@/app/redux/apis/DocumentsApi';
import { useParams } from 'next/navigation';

export default function ItemsView() {
  const params = useParams();
  const { id } = params;
  const { data: response } = documentsApi.useGetItemQuery(String(id));

  return (
    <StyledContainer>
      <h1 className="text-2xl">Documents məlumatları</h1>
      <DataMapper data={[]} />
    </StyledContainer>
  );
}
