import * as crypto from 'crypto';
require('dotenv').config();

const keyLength = Number(process.env.CRYPTO_KEY_LENGTH!);
const defaultSalt = process.env.CRYPTO_SECRET!;

export const generateRandomSalt = (): string => {
  // 1238990asdh9as8eduhkj123ioi
  return crypto.randomBytes(keyLength).toString('hex');
}

export const generatePasswordWithSalt = (value: string, salt: string): string => {
  if (!salt.length) {
    throw new Error('Invalid salt');
  }
  // 1234 + 1238990asdh9as8eduhkj123ioi
  const passwordWithSalt = value + salt;
  return generateHash(passwordWithSalt);
}

const generateHash = (value: string): string => {
  // (1234 + 1238990asdh9as8eduhkj123ioi) + process.env.CRYPTO_SECRET = 127839u12jbjejyguisa8duhas
  return crypto.scryptSync(value, defaultSalt, 64).toString('base64'); // [a-zA-Z0-9]
}
