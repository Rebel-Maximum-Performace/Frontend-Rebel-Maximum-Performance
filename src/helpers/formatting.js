export const formatMoney = (value = '0', prefix = '$') => {
  const numberString = value?.toString() || '';
  if (!numberString) {
    return numberString;
  }
  const split = numberString.split('.');
  let decimal = split[1];
  const formatted = split[0].replace(/(\d)(?=(\d{3})+$)/g, '$&.');

  if (decimal === undefined) {
    decimal = '00';
  } else if (decimal[1] === undefined) {
    decimal = `${decimal}`;
  }
  return `${prefix}${formatted},${decimal}`;
};

export const parseNumber = (input) => {
  if (input == null || input === '') {
    return 0;
  }
  const parsed = Number(input.toString().replace(/[^0-9]/g, ''));
  return isNaN(parsed) ? 0 : parsed;
};

export const formatProductCode = (input) => {
  if (input == null || input === '') {
    return '';
  }

  const toAlphaNumericAndStrip = input
    .toString()
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toUpperCase();

  return toAlphaNumericAndStrip;
};
