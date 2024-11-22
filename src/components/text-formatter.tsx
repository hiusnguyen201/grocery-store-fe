import { useFormatter } from "next-intl";

type TextCurrencyProps = { type: "currency"; value: number };
type TextDateProps = { type: "date"; value: string | number | Date };
type TextDateTimeProps = {
  type: "datetime";
  value: string | number | Date;
};

type TextFormatterProps = (
  | TextCurrencyProps
  | TextDateProps
  | TextDateTimeProps
) & {
  className?: string;
};

export function TextFormatter({
  type,
  value,
  className,
}: TextFormatterProps) {
  const format = useFormatter();
  let result = "";
  switch (type) {
    case "currency":
      result = format.number(value, {
        style: "currency",
        currency: "VND",
      });
      break;
    case "date":
      result = format.dateTime(
        typeof value === "string" ? new Date(value) : value,
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
      );
      break;
    case "datetime":
      result = format.dateTime(
        typeof value === "string" ? new Date(value) : value,
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          minute: "2-digit",
          hour: "2-digit",
          second: "2-digit",
        }
      );
      break;
    default:
      break;
  }

  return <span className={className}>{result}</span>;
}
