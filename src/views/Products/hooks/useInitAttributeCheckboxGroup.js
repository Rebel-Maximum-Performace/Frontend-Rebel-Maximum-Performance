import { useState } from 'react';

const useInitAttributeCheckboxGroup = ({
  filterQuery,
  onChangeQueryState,
  isLarge,
  attributes,
}) => {
  const [isSelectOpen, setIsSelectOpen] = useState(isLarge ? attributes : []);

  const toggleSelect = (key) => {
    if (isSelectOpen.includes(key)) {
      setIsSelectOpen(isSelectOpen.filter((item) => item !== key));
    } else {
      setIsSelectOpen([...isSelectOpen, key]);
    }
  };

  const onCheckAttributeValue = (key, value) => {
    const currentAttributes = filterQuery;
    const index = currentAttributes.findIndex((item) => item.key === key);

    if (index !== -1 && currentAttributes.length > 0) {
      if (currentAttributes[index].values.includes(value)) {
        currentAttributes[index].values = currentAttributes[
          index
        ].values.filter((item) => item !== value);

        if (currentAttributes[index].values.length === 0) {
          currentAttributes.splice(index, 1);
        }
      } else {
        currentAttributes[index].values.push(value);
      }
    } else {
      currentAttributes.push({ key, values: [value] });
    }
    onChangeQueryState('filter', currentAttributes);
  };

  return { isSelectOpen, toggleSelect, onCheckAttributeValue };
};

export default useInitAttributeCheckboxGroup;
