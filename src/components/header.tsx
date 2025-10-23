"use client";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full border-b bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
          {/* hamburger */}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="text-lg font-semibold">UteShop Admin</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex flex-col text-right">
          <span className="text-sm font-medium">Admin</span>
          <span className="text-xs text-slate-500">admin@gmail.com</span>
        </div>
        <button className="flex items-center gap-2 px-3 py-1 rounded-md border hover:bg-slate-50 dark:hover:bg-slate-800">
          <Image
            src="/global.svg"
            width={14}
            height={14}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm">Profile</span>
        </button>
      </div>
    </header>
  );
}
