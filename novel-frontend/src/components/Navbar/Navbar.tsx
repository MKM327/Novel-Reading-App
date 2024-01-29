import Image from "next/image";
import Link from "next/link";
import Button from "../utils/ui/Button";

export default function Navbar() {
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
          <li>
            <Button className="py-2 px-3">
              <Link href="/profile">Profile</Link>
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
