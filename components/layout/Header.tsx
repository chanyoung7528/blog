// components/Header.js
import Link from "next/link";

const Header = () => (
  <header className="flex justify-between items-center p-4">
    <div className="text-lg font-bold">
      <Link href="/">kakao tech</Link>
    </div>
    <nav className="space-x-4">
      <Link href="/blog">Blog</Link>
      <Link href="/events">Events</Link>
      <Link href="/careers">Careers</Link>
      <a
        href="https://developers.kakao.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Kakao Developers
      </a>
    </nav>
    <div>{/* 검색 아이콘 자리 */}</div>
  </header>
);

export default Header;
