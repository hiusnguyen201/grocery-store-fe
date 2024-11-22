import { CircleCheck } from "lucide-react";

export function CheckIcon({
  valid,
}: {
  valid: boolean | null | undefined | string;
}) {
  return (
    <CircleCheck
      width={!valid ? 18 : 22}
      height={!valid ? 18 : 22}
      fill={!valid ? "white" : "green"}
      stroke={!valid ? "black" : "white"}
    />
  );
}
