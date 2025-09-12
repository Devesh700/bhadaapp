
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

const Loader = ({ size = "md", className, text = "Loading..." }: LoaderProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-3", className)}>
      <div className={cn("animate-spin rounded-full border-3 border-blue-200 border-t-blue-600", sizeClasses[size])}></div>
      {text && (
        <p className="text-sm text-blue-600 font-medium animate-pulse">{text}</p>
      )}
    </div>
  );
};

export { Loader };
