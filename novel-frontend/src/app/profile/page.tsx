import { redirect } from "next/navigation";
import { auth } from "../api/auth/[...nextauth]/auth";

export default async function Profile() {
  return <div>Profile</div>;
}
