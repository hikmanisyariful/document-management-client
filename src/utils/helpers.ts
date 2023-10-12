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

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatHours = (date: Date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formatMinutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + formatMinutes + " " + ampm;
  return strTime;
};

export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

export const formatDate = (date: Date) => {
  return `${date.getDate()} ${monthNames[date.getMonth()].slice(0, 3)} ${date
    .getFullYear()
    .toString()
    .slice(-2)} - ${formatHours(date)}`;
};
