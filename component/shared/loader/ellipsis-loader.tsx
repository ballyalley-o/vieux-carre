import { FC } from 'react';
import { Ellipsis } from 'lucide-react';
import { cn } from "lib/util"

interface EllipsisLoaderProps {
    className?: string
}

const EllipsisLoader: FC<EllipsisLoaderProps> = ({ className, ...props }) => {
  return (
    <div className="flex items-center justify-center">
      <Ellipsis
        className={cn(
          "animate-wave text-gray-600",
          "transform origin-bottom",
          "hover:animate-none",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default EllipsisLoader