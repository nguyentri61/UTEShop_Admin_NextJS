"use client";
import React from "react";
import Link from "next/link";

type NavItem = { href: string; label: string; icon?: React.ReactNode };

const items: NavItem[] = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Quản lý đơn hàng" },
  { href: "/admin/products", label: "Quản lý sản phẩm" },
  { href: "/admin/users", label: "Quản lý user" },
  { href: "/admin/settings", label: "Cài đặt hệ thống" },
  { href: "/admin/comments", label: "Quản lý comment" },
  { href: "/admin/promotions", label: "Khuyến mãi" },
  { href: "/admin/notifications", label: "Thông báo" },
];

export default function Navbar() {
  return (
    <aside className="w-64 hidden md:block border-r bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 min-h-screen p-4">
      <div className="mb-6 px-1">
        <div className="text-sm uppercase text-slate-500 font-medium">
          Menu quản lý
        </div>
      </div>
      <nav className="flex flex-col gap-1">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="px-3 py-2 rounded-md text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {it.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
