// components/layout/Header.tsx
import Link from "next/link";
import DarkModeToggle from "@/components/ui/DarkModeToggle";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="text-lg font-bold">
        <Link href="/">kakao tech</Link>
      </div>
      <nav className="space-x-4">
        <DarkModeToggle />
      </nav>
    </header>
  );
};

export default Header;
