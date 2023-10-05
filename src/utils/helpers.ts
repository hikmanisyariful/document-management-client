import Aes from "crypto-js/aes";
import utf8 from "crypto-js/enc-utf8";

export interface CookieSetOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | "none" | "lax" | "strict";
  encode?: (value: string) => string;
}

export const getCookieOptions = () => {
  const expireDate = new Date();
  expireDate.setUTCDate(new Date().getUTCDate() + 365);
  const cookieOptions: CookieSetOptions = {
    path: "/",
    sameSite: false,
    expires: expireDate,
    secure: true,
  };
  return cookieOptions;
};

export const encryptString = (value: string): string => {
  const encrypted = Aes.encrypt(
    value,
    process.env.NEXT_PUBLIC_COOKIE_KEY!
  ).toString();

  return encrypted;
};

export const decryptString = (value: string): string => {
  const decrypted = Aes.decrypt(
    value,
    process.env.NEXT_PUBLIC_COOKIE_KEY!
  ).toString(utf8);

  return decrypted;
};
