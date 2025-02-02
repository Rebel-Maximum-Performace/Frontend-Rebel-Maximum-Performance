import CryptoJS from 'crypto-js';

const encryptData = (data) =>
  CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.NEXT_PUBLIC_ENCRYPTION_SECRET,
  ).toString();

const decryptData = (data) => {
  const bytes = CryptoJS.AES.decrypt(
    data,
    process.env.NEXT_PUBLIC_ENCRYPTION_SECRET,
  ).toString(CryptoJS.enc.Utf8);
  return JSON.parse(bytes);
};

export { encryptData, decryptData };
