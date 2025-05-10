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

  let hasDecimal = false;
  const cleanedInput = input
    .toString()
    .split('')
    .filter((char) => {
      if (char === '.' && !hasDecimal) {
        hasDecimal = true; // Izinkan hanya satu titik
        return true;
      }
      return /^\d+$/.test(char); // Hanya angka
    })
    .join('');

  const parsed = cleanedInput;

  return isNaN(parsed) ? 0 : parsed;
};

export const parseDollarInput = (input) => {
  // Handle null/undefined/empty input
  if (!input && input !== 0) return 0;

  const str = input.toString();

  // Extract valid number parts (digits and first decimal point)
  const [integerPart, decimalPart] = str
    .replace(/[^\d.]/g, '') // Remove all non-digit/non-dot characters
    .split('.')
    .map((part) => part || '0'); // Handle empty parts

  // Format decimal part
  let formattedDecimal = '0';
  if (str.includes('.')) {
    if (str.endsWith('.')) {
      formattedDecimal = '0'; // Handle trailing dot
    } else {
      formattedDecimal = decimalPart
        .slice(0, 2) // Take max 2 decimal places
        .padEnd(1, '0'); // Ensure at least 1 digit

      // Simplify .00 to .0
      if (formattedDecimal === '00') formattedDecimal = '0';
    }
  }

  // Combine parts and convert to Number
  const numberValue = parseFloat(`${integerPart}.${formattedDecimal}`);

  return isNaN(numberValue) ? 0 : numberValue;
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

export function formatDate(inputDate) {
  // Membuat objek Date dari input string
  const date = new Date(inputDate);

  // Mengambil komponen tanggal dan waktu
  const day = String(date.getUTCDate()).padStart(2, '0'); // Hari (DD)
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Bulan (MM), ditambah 1 karena dimulai dari 0
  const year = date.getUTCFullYear(); // Tahun (YYYY)

  const hours = String(date.getUTCHours()).padStart(2, '0'); // Jam (HH)
  const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // Menit (mm)
  const seconds = String(date.getUTCSeconds()).padStart(2, '0'); // Detik (ss)

  // Menggabungkan semua komponen menjadi format DD-MM-YYYY HH:mm:ss
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}
