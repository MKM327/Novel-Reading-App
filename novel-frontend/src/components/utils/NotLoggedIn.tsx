"use client";
import { signIn } from "next-auth/react";
import Button from "./ui/Button";

export default function NotLoggedIn() {
  return (
    <div className="h-full flex items-center flex-col gap-2 justify-center">
      <h1 className="text-xl">You need to log in to view this page</h1>
      <Button onClick={() => signIn()}>Log in</Button>
    </div>
  );
}
