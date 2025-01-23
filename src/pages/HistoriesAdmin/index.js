'use client';
import Table from '@/components/Table';
import LayoutAdmin from '../CategoriesAdmin/components/LayoutAdmin';
import { useInitHistoriesAdmin } from './hook';
import { useWebContext } from '@/context/WebContext';

const HistoriesAdminPageView = () => {
  const { headers, actions, onClickAction, histories, isLoading } =
    useInitHistoriesAdmin();
  const { t } = useWebContext();

  return (
    <LayoutAdmin selectedMenu={t('MENU_ADMIN.Riwayat')}>
      <h3 className="text-bodyMd lg:text-h3 font-helvetica_bold mb-[10px]">
        History Activity
      </h3>
      {isLoading ? (
        <div className="animate-spin w-[40px] h-[40px] border-4 border-b-secondary-20 border-l-secondary-20 border-primary-50 rounded-full" />
      ) : (
        <Table
          headers={headers}
          actions={actions}
          onClickAction={onClickAction}
          contents={histories}
        />
      )}
    </LayoutAdmin>
  );
};

export default HistoriesAdminPageView;
