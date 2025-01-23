'use client';
import SecureLS from 'secure-ls';

const ls =
  typeof window !== 'undefined'
    ? new SecureLS({
        encodingType: 'aes',
        encryptionSecret: process.env.NEXT_PUBLIC_ENCRYPTION_SECRET,
        isCompression: false,
      })
    : {};

export const setLocalStorage =
  typeof window !== 'undefined' ? (key, value) => ls.set(key, value) : () => {};
export const getLocalStorage =
  typeof window !== 'undefined' ? (key) => ls.get(key) : () => {};
export const removeLocalStorage =
  typeof window !== 'undefined' ? (key) => ls.remove(key) : () => {};
export const removeAllLocalStorage =
  typeof window !== 'undefined'
    ? () => {
        // Handle Exception
        const listKeyException = ['_secure__ls__metadata', 'language'];
        const arrayKey = ls.getAllKeys();
        arrayKey.forEach((keyValue) =>
          listKeyException.includes(keyValue) ? keyValue : ls.remove(keyValue),
        );
      }
    : () => {};
