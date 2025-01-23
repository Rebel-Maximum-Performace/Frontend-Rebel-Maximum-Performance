'use client';
import { useInitDetails } from '../hook';

const Details = () => {
  const { t, detailHistories, renderDetails } = useInitDetails();

  return (
    <div>
      <div className="flex w-full justify-between items-start my-[15px] lg:my-[20px]">
        <div>
          <p className="font-helvetica_bold">{t(`HISTORIES_DETAIL.Dibuat`)}</p>
          <p className="font-helvetica_regular">
            {detailHistories?.createdDate || '-'}
          </p>
        </div>
        <div>
          <p className="font-helvetica_bold">{t(`HISTORIES_DETAIL.Aksi`)}</p>
          <p className="font-helvetica_regular">
            {detailHistories?.action || '-'}
          </p>
        </div>
        <div>
          <p className="font-helvetica_bold">{t(`HISTORIES_DETAIL.Fitur`)}</p>
          <p className="font-helvetica_regular">
            {detailHistories?.feature || '-'}
          </p>
        </div>
      </div>

      <div className="mb-[15px] lg:mb-[20px]">
        <p className="font-helvetica_bold">{t(`HISTORIES_DETAIL.Data Lama`)}</p>
        {detailHistories?.oldData &&
          renderDetails(detailHistories?.oldData, detailHistories.feature)}
      </div>

      <div className="mb-[15px] lg:mb-[20px]">
        <p className="font-helvetica_bold">{t(`HISTORIES_DETAIL.Data Baru`)}</p>
        {detailHistories?.newData &&
          renderDetails(detailHistories?.newData, detailHistories.feature)}
      </div>
    </div>
  );
};

export default Details;
