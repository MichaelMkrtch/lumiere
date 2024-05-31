"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

import SearchModal from "../search/SearchModal";

type ListItemProps = { path: string; children: ReactNode };

function ListItem({ path, children }: ListItemProps) {
  const pathname = usePathname();

  return (
    <li className="duration-75 ease-in-out active:scale-95">
      <Link
        href={`${path}`}
        className={`px-3 py-2 transition-colors duration-75 ease-in ${pathname === path ? "text-cyan-350" : null}`}
      >
        {children}
      </Link>
    </li>
  );
}

function NavBar() {
  return (
    <nav>
      <ul className="flex h-10 items-center rounded-full bg-zinc-800/45 px-3 text-sm font-medium tracking-wide shadow-lg shadow-zinc-800/5 ring-1 ring-white/10 backdrop-blur-md">
        <ListItem path="/films">Films</ListItem>
        <ListItem path="/lists">Lists</ListItem>
        <ListItem path="/articles">Articles</ListItem>
        <ListItem path="/library">Library</ListItem>
      </ul>
    </nav>
  );
}

export default function Header() {
  return (
    <header className="fixed flex w-full max-w-5xl items-center justify-between py-5">
      <Link href="/">
        <h1 className="font-noto text-3xl font-bold">Lumière</h1>
      </Link>

      <NavBar />

      <SearchModal>
        <button className="rounded bg-cyan-350 px-4 py-2 font-medium tracking-wide text-gray-850 outline-none ring-1 ring-cyan-450 transition-colors duration-200 ease-out active:bg-cyan-550">
          Search
        </button>
      </SearchModal>
    </header>
  );
}
