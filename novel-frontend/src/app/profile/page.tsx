"use client";
import { redirect } from "next/navigation";
import { auth } from "../api/auth/[...nextauth]/auth";
import { signOut } from "next-auth/react";

export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <button onClick={() => signOut()}>Log out </button>
    </div>
  );
}
