import { useWebContext } from '@/context/WebContext';
import useDebounce from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';

const useInitTableDetailsInput = ({ data }) => {
  const { t } = useWebContext();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({
    sortBy: 0,
    order: 'asc',
    filters: [],
  });
  const [listFilter, setListFilter] = useState([]);
  const [popupFilter, setPopupFilter] = useState(false);
  const [dataFiltered, setDataFiltered] = useState(null);
  const [sortByList, setSortByList] = useState([]);
  const orderList = [
    { label: 'A-Z', value: 'asc' },
    { label: 'Z-A', value: 'desc' },
  ];

  const debounceData = useDebounce(data, 1000);

  useEffect(
    () => () => {
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
        setFilter({
          ...filter,
          filters: data.headers.map((hd) => ({ key: hd.label, values: [] })),
        });
      }
    },
    [debounceData],
  );

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

  const onApplyFilter = () => {
    const filteringData = data.contents.filter((item) => {
      return filter.filters.includes(item);
    });

    setDataFiltered(filteringData);
    setPopupFilter(false);
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
    listFilter,
    onChangeListFilter,
    popupFilter,
    setPopupFilter,
    onApplyFilter,
  };
};

export default useInitTableDetailsInput;
