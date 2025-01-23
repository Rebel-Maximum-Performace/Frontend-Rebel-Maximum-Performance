export const findIndexPath = (array, targetValue) => {
  const search = (items, value, path = []) => {
    for (let i = 0; i < items.length; i++) {
      const currentPath = [...path, i];
      if (items[i].value === value) {
        return currentPath.join('-');
      }
      if (items[i].children) {
        const result = search(items[i].children, value, currentPath);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  return search(array, targetValue);
};

export const findLabelByValue = (items, value) => {
  for (const item of items) {
    if (item.value === value) return item.label;
    if (item.children) {
      const foundLabel = findLabelByValue(item.children, value);
      if (foundLabel) return foundLabel;
    }
  }
  return '';
};

export const transformToObject = (input) => {
  const parts = input?.split('-');
  const result = {};
  let currentKey = '';

  parts?.forEach((part, index) => {
    currentKey += index === 0 ? part : `-${part}`;
    result[currentKey] = true;
  });

  return result;
};
