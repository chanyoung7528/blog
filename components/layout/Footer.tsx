"use client";

import Link from "next/link";
import { Github, Linkedin, Rss, ExternalLink, ArrowRight } from "lucide-react";

const Footer = () => (
  <footer className="border-neutral-200 text-sm text-neutral-500  mt-24 border-t   bg-gray8 px-6  py-10 dark:bg-black">
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
      {/* About */}
      <div>
        <h4 className="text-neutral-800 mb-3 text-base font-semibold">About</h4>
        <ul className="space-y-2">
          <li>
            <Link
              href="/about"
              className="flex items-center gap-2 hover:text-indigo"
            >
              <ArrowRight size={16} />
              블로그 소개
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="flex items-center gap-2 hover:text-indigo"
            >
              <ArrowRight size={16} />
              연락하기
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
            <Link
              href="https://toss.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-indigo"
            >
              <ExternalLink size={16} />
              토스
            </Link>
          </li>
          <li>
            <Link
              href="https://developers.kakao.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-indigo"
            >
              <ExternalLink size={16} />
              Kakao Developers
            </Link>
          </li>
          <li>
            <Link
              href="https://about.daangn.com/blog/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-indigo"
            >
              <ExternalLink size={16} />
              당근
            </Link>
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
            <Link
              href="https://github.com/chanyoung7528"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-indigo"
            >
              <Github size={16} />
              GitHub
            </Link>
          </li>
          <li>
            <Link
              href="https://linkedin.com/in/chance"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-indigo"
            >
              <Linkedin size={16} />
              LinkedIn
            </Link>
          </li>
        </ul>
      </div>

      {/* Stack */}
      <div>
        <h4 className="text-neutral-800 mb-3 text-base font-semibold">Stack</h4>
        <ul className="text-neutral-500 space-y-2">
          <li>
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-indigo"
            >
              Next.js 15
            </Link>
          </li>
          <li>
            <Link
              href="https://reactnative.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-indigo"
            >
              React Native
            </Link>
          </li>
          <li>
            <Link
              href="https://nuxt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-indigo"
            >
              Nuxt3
            </Link>
          </li>
        </ul>
      </div>
    </div>

    <div className="text-xs text-neutral-400 mt-12 text-center">
      <p>© {new Date().getFullYear()} Chans Blog. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
