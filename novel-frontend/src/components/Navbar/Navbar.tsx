import Link from "next/link";
import Button from "../utils/ui/Button";
import { auth } from "@/app/api/auth/[...nextauth]/auth";

export default async function Navbar() {
  let session = await auth();

  return (
    <nav className="w-full p-2 sticky top-0 bg-zinc-900">
      <div className="w-4/5 m-auto">
        <ul className="flex items-center justify-between">
          <li>
            <Button className="py-2 px-3">
              <Link href="/">Home</Link>
            </Button>
          </li>
          <li>
            <Button className="py-2 px-3">
              <Link href="/novels">Novels</Link>
            </Button>
          </li>
          {session ? (
            <li>
              <Button className="py-2 px-3">
                <Link href="/profile">Profile</Link>
              </Button>
            </li>
          ) : (
            <div className="flex gap-3">
              <Button>
                <Link href={"/register"}>Register</Link>
              </Button>
              <Button>
                <Link href={"/api/auth/signin/credentials"}>Login</Link>
              </Button>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
}
