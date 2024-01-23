import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full p-2 sticky top-0 bg-gradient-to-l  from-black to-gray-900">
      <ul className="flex items-center gap-2">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/novels">Novels</a>
        </li>
      </ul>
    </nav>
  );
}
