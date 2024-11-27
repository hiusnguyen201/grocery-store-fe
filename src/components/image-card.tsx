import { formatBytes } from "@/lib/utils";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ImageCardProps {
  src: string;
  name: string;
  onRemove: (value: string) => void;
  progress?: number;
  size: number;
  id: string;
}

export function ImageCard({
  id,
  src,
  progress,
  onRemove,
  name,
  size,
}: ImageCardProps) {
  return (
    <div className="relative flex items-center space-x-4">
      <div className="flex flex-1 space-x-4">
        <img
          src={src}
          alt={name}
          width={48}
          height={48}
          loading="lazy"
          className="aspect-square shrink-0 rounded-md object-cover"
        />
        <div className="flex w-full flex-col gap-2">
          <div className="space-y-px">
            <p className="line-clamp-1 text-sm font-medium text-foreground/80">
              {name}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatBytes(size)}
            </p>
          </div>
          {progress ? <Progress value={progress} /> : null}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-7"
          onClick={() => {
            onRemove(id);
          }}
        >
          <Trash2 className="size-4 " aria-hidden="true" />
          <span className="sr-only">Remove file</span>
        </Button>
      </div>
    </div>
  );
}
