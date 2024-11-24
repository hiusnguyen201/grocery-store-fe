import { clsx, type ClassValue } from "clsx";
import { DateTimeFormatOptions, useFormatter } from "next-intl";
import { twMerge } from "tailwind-merge";

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

export function formatCurrency(num: number) {
  const format = useFormatter();

  return format.number(num, {
    style: "currency",
    currency: "VND",
  });
}

export function formatDate(
  date: Date | number | string,
  opt: {
    type: "short" | "long";
  }
) {
  const format = useFormatter();

  let options: DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  if (opt.type === "long") {
    options = {
      ...options,
      minute: "2-digit",
      hour: "2-digit",
      second: "2-digit",
    };
  }

  if (typeof date === "string") {
    return format.dateTime(new Date(date), options);
  } else {
    return format.dateTime(date, options);
  }
}
