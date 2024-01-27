import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full p-2 sticky top-0 bg-gradient-to-l  from-black to-gray-900">
      <ul className="flex items-center gap-2">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/novels">Novels</Link>
        </li>
      </ul>
    </nav>
  );
}
