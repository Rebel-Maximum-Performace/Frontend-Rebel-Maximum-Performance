'use client';
import SecureLS from 'secure-ls';

const ls = new SecureLS({
  encodingType: 'aes',
  encryptionSecret: process.env.NEXT_PUBLIC_ENCRYPTION_SECRET,
  isCompression: false,
});

export const setLocalStorage = (key, value) => ls.set(key, value);
export const getLocalStorage = (key) => ls.get(key);
export const removeLocalStorage = (key) => ls.remove(key);
export const removeAllLocalStorage = () => {
  // Handle Exception
  const listKeyException = ['_secure__ls__metadata', 'language'];
  const arrayKey = ls.getAllKeys();
  arrayKey.forEach((keyValue) =>
    listKeyException.includes(keyValue) ? keyValue : ls.remove(keyValue),
  );
};
