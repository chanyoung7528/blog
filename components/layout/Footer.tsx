"use client";

import Link from "next/link";
import { Github, Linkedin, Rss, ExternalLink, ArrowRight } from "lucide-react";

const Footer = () => (
  <footer className="border-neutral-200 text-sm text-neutral-500  dark:bg-black mt-24   border-t bg-gray8  px-6 py-10">
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
      {/* About */}
      <div>
        <h4 className="text-neutral-800 mb-3 text-base font-semibold">About</h4>
        <ul className="space-y-2">
          <li>
            <Link
              href="/about"
              className="hover:text-black flex items-center gap-2"
            >
              <ArrowRight size={16} />
              블로그 소개
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-black flex items-center gap-2"
            >
              <ArrowRight size={16} />
              연락하기
            </Link>
          </li>
          <li>
            <Link
              href="/rss.xml"
              className="hover:text-black flex items-center gap-2"
            >
              <Rss size={16} />
              RSS 구독
            </Link>
          </li>
        </ul>
      </div>

      {/* Tech */}
      <div>
        <h4 className="text-neutral-800 mb-3 text-base font-semibold">
          Tech Links
        </h4>
        <ul className="space-y-2">
          <li>
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black flex items-center gap-2"
            >
              <ExternalLink size={16} />
              Next.js
            </a>
          </li>
          <li>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black flex items-center gap-2"
            >
              <ExternalLink size={16} />
              Vercel
            </a>
          </li>
          <li>
            <a
              href="https://developers.kakao.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black flex items-center gap-2"
            >
              <ExternalLink size={16} />
              Kakao Developers
            </a>
          </li>
        </ul>
      </div>

      {/* Social */}
      <div>
        <h4 className="text-neutral-800 mb-3 text-base font-semibold">
          Social
        </h4>
        <ul className="space-y-2">
          <li>
            <a
              href="https://github.com/chance-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black flex items-center gap-2"
            >
              <Github size={16} />
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/chance"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black flex items-center gap-2"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </li>
        </ul>
      </div>

      {/* Stack */}
      <div>
        <h4 className="text-neutral-800 mb-3 text-base font-semibold">Stack</h4>
        <ul className="text-neutral-500 space-y-2">
          <li>Next.js 15</li>
          <li>Tailwind CSS</li>
          <li>Contentlayer</li>
          <li>MDX</li>
        </ul>
      </div>
    </div>

    <div className="text-xs text-neutral-400 mt-12 text-center">
      <p>© {new Date().getFullYear()} Chans Blog. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
