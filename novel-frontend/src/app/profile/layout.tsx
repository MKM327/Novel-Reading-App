import { PropsWithChildren } from "react";

export default async function layout({ children }: PropsWithChildren) {
  console.log("here");
  return (
    <div>
      <div>Header</div>
      {children}
      <div>Footer</div>
    </div>
  );
}
