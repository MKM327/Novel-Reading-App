import { redirect } from "next/navigation";
import { auth } from "../api/auth/[...nextauth]/auth";

export default async function Profile() {
  const data = await auth();
  if (!data) {
    redirect("/api/auth/signin/credentials");
  }
  return <div>Profile</div>;
}
