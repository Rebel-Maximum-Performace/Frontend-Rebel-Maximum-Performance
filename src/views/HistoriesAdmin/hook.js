import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

export const useInitHistoriesAdmin = () => {
  const router = useRouter();
  // const { data, isLoading } = useHistoriesAdmin();
  const headers = [
    {
      label: 'Action',
      field: 'action',
      position: 'left',
      width: '20%',
    },
    {
      label: 'Feature',
      field: 'feature',
      position: 'left',
      width: '50%',
    },
    {
      label: 'Created',
      field: 'createdDate',
      position: 'left',
      width: '30%',
    },
  ];

  const actions = [
    {
      label: (
        <Button color="primary" variant="contained">
          Detail
        </Button>
      ),
      name: 'detail',
    },
  ];

  const onClickAction = (action, data) => {
    if (action === 'detail' && data.id) {
      router.push(`/admin/histories/${data.id}`);
    }
  };

  return {
    headers,
    actions,
    onClickAction,
    histories: [],
    isLoading: false,
  };
};
