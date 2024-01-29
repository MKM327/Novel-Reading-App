import { PropsWithChildren } from "react";

export default async function layout({ children }: PropsWithChildren) {
  return (
    <div className="h-full bg-zinc-950 pt-5">
      <div className="h-full w-3/5 m-auto">
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
}
