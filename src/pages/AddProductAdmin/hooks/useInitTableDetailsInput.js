import { useTranslation } from '@/app/i18n/client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const useInitTableDetailsInput = ({ data }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({
    sortBy: 0,
    order: 'asc',
    filters: [],
  });
  const [listFilter, setListFilter] = useState([]);
  const [popupFilter, setPopupFilter] = useState(false);
  const [dataFiltered, setDataFiltered] = useState([]);
  const { lng } = useParams();
  const { t } = useTranslation(lng, 'translation');
  const [sortByList, setSortByList] = useState([]);
  const orderList = [
    { label: 'A-Z', value: 'asc' },
    { label: 'Z-A', value: 'desc' },
  ];

  useEffect(() => {
    if (
      data.headers.some((item) => item.label !== '') &&
      data.headers.some((header) =>
        data.contents.some((item) => item[header.label] !== ''),
      )
    ) {
      setSortByList(
        data.headers?.map((header, index) => ({
          label: header.label,
          value: index,
        })),
      );
      setListFilter(
        data.headers?.map((header) => ({
          key: header.label,
          values: data.contents?.map((content) => content[header.label]),
        })),
      );
    }
  }, [data]);

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const onChangeFilter = (filterKey, value) => {
    setFilter({
      ...filter,
      [filterKey]: value,
    });
  };

  const onChangeListFilter = (_, newList) => {
    setFilter({
      ...filter,
      filters: newList,
    });
  };

  return {
    search,
    onSearch,
    dataFiltered,
    t,
    filter,
    onChangeFilter,
    sortByList,
    orderList,
    lng,
    listFilter,
    onChangeListFilter,
    popupFilter,
    setPopupFilter,
  };
};

export default useInitTableDetailsInput;
