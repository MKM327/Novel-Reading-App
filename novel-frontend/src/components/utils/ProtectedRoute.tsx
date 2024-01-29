import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { PropsWithChildren } from "react";
import NotLoggedIn from "./NotLoggedIn";

type ProtectedRouteProps = PropsWithChildren;
export default async function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const session = await auth();

  return <>{session ? children : <NotLoggedIn />}</>;
}
