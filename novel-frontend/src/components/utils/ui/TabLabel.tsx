import { ComponentProps, PropsWithoutRef } from "react";

interface TabLabelWrapperProps extends ComponentProps<"div"> {}

export default function TabLabelWrapper({
  children,
  className,
}: TabLabelWrapperProps) {
  return <div className="flex  gap-2">{children}</div>;
}
