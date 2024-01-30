import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.HTMLProps<HTMLInputElement> {}
export default forwardRef(function Input(
  props: InputProps,
  ref?: React.Ref<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className={twMerge(
        "outline-none w-full p-2 rounded-md placeholder:text-black text-black bg-gray-300",
        props?.className
      )}
      ref={ref}
    />
  );
});
