import ProtectedRoute from "@/components/utils/ProtectedRoute";
import { PropsWithChildren } from "react";

export default async function layout({ children }: PropsWithChildren) {
  return (
    <>
      <ProtectedRoute>{children}</ProtectedRoute>
    </>
  );
}
