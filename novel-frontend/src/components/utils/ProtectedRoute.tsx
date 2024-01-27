import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { PropsWithChildren } from "react";

type ProtectedRouteProps = PropsWithChildren;
export default async function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const session = await auth();

  return (
    <div>
      <div>Header</div>
      {session && children}
      <div>Footer</div>
    </div>
  );
}
