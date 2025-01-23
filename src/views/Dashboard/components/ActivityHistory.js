'use client';
import Button from '@/components/Button';
import Table from '@/components/Table';
import { useWebContext } from '@/context/WebContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const actionActivityHistory = [
  {
    name: 'detail',
    label: (
      <Button color="primary" variant="contained">
        Detail
      </Button>
    ),
  },
];

const ActivityHistory = ({ activityHistory }) => {
  const { t } = useWebContext();
  const router = useRouter();
  const headersActivityHistory = [
    {
      label: t(`DASHBOARD.Tindakan`),
      field: 'action',
      position: 'left',
    },
    {
      label: t(`DASHBOARD.Fitur`),
      field: 'feature',
      position: 'left',
    },
    {
      label: t(`DASHBOARD.Dibuat`),
      field: 'createdDate',
      position: 'left',
    },
  ];

  const onClickAction = (name, data) => {
    if (name === 'detail') {
      router.push(`/histories/${data.id || 1}`);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center my-[15px] lg:my-[20px]">
        <h3 className="text-bodySm md:text-h5 font-helvetica_bold text-netral-90">
          {t(`DASHBOARD.Riwayat Aktivitas`)}
        </h3>
        <Link href="/admin/histories">
          <h3 className="text-bodySm md:text-h5 font-helvetica_regular text-primary-50">
            {t(`HOMEPAGE.Lihat Semua`)}
          </h3>
        </Link>
      </div>
      <Table
        headers={headersActivityHistory}
        contents={activityHistory}
        actions={actionActivityHistory}
        onClickAction={onClickAction}
      />
    </>
  );
};

export default ActivityHistory;
