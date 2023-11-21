import cryptoJs from 'crypto-js';

const HASH_KEY = process.env.AES_HASH_KEY || '';

export const encrypt = (str: string) => {
  if (!str || typeof str !== 'string') return '';

  const encrypted = cryptoJs.AES.encrypt(
    str,
    cryptoJs.enc.Utf8.parse(HASH_KEY),
    {
      iv: cryptoJs.enc.Utf8.parse(HASH_KEY),
      padding: cryptoJs.pad.Pkcs7,
      mode: cryptoJs.mode.CBC,
    },
  ).toString();
  return encrypted;
};

export const decrypt = (encryptedText: string) => {
  const decipher = cryptoJs.AES.decrypt(
    encryptedText,
    cryptoJs.enc.Utf8.parse(HASH_KEY),
    {
      iv: cryptoJs.enc.Utf8.parse(HASH_KEY),
      padding: cryptoJs.pad.Pkcs7,
      mode: cryptoJs.mode.CBC,
    },
  );

  return decipher.toString(cryptoJs.enc.Utf8);
};
