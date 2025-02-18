import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

export const ActionButtonsForTable = ({
  id,
  path,
  deleteItem,
  actions,
}: {
  id: number;
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteItem: (id: string) => Promise<void>;
  actions: ('view' | 'edit' | 'delete')[];
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex gap-x-4">
        {actions.includes('view') && (
          <button
            className="w-5 h-5 "
            onClick={() => {
              router.push(`/${path}/view/${id}`);
            }}
            title="ətraflı bax"
          >
            <EyeIcon fontSize="15px" color="white" className="hover:text-gray-600 transition-all" />
          </button>
        )}
        {actions.includes('edit') && (
          <button
            className="w-5 h-5"
            onClick={() => {
              router.push(`/${path}/edit/${id}`);
            }}
            title="Dəyişiklik et"
          >
            <PencilIcon
              fontSize="15px"
              color="white"
              className="hover:text-gray-600 transition-all"
            />
          </button>
        )}
        {actions.includes('delete') && (
          <button title="sil" onClick={() => deleteItem(String(id))} className="w-5 h-5">
            <TrashIcon
              fontSize="15px"
              color="white"
              className="hover:text-gray-600 transition-all"
            />
          </button>
        )}
      </div>
    </>
  );
};
