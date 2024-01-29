import { twMerge } from "tailwind-merge";

interface buttonProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}
export default function Button({ className, onClick, children }: buttonProps) {
  return (
    <button
      className={twMerge("bg-blue-700 p-3 rounded-lg font-bold", className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
