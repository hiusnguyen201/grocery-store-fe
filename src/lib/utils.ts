import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTimeFormatOptions, useFormatter } from "next-intl";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate"
      ? accurateSizes[i] ?? "Bytest"
      : sizes[i] ?? "Bytes"
  }`;
}

export function FormatCurrency(num: number) {
  const format = useFormatter();
  return format.number(num, { style: "currency", currency: "VND" });
}

export function FormatDate(date: Date, type: "long" | "short" = "short") {
  const format = useFormatter();

  let options: DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  if (type === "long") {
    options = {
      ...options,
      minute: "2-digit",
      hour: "2-digit",
      second: "2-digit",
    };
  }

  return format.dateTime(date, options);
}
