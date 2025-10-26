"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  FolderTree,
  Users,
  Settings,
  MessageSquare,
  Tag,
  Bell,
  ChevronRight,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
};

const items: NavItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    href: "/admin/users",
    label: "Người dùng",
    icon: <Users className="w-5 h-5" />,
  },
  {
    href: "/admin/categories",
    label: "Danh mục",
    icon: <FolderTree className="w-5 h-5" />,
  },
  {
    href: "/admin/products",
    label: "Sản phẩm",
    icon: <Package className="w-5 h-5" />,
  },
  {
    href: "/admin/orders",
    label: "Đơn hàng",
    icon: <ShoppingCart className="w-5 h-5" />,
  },
  {
    href: "/admin/coupons",
    label: "Khuyến mãi",
    icon: <Tag className="w-5 h-5" />,
  },
];

export default function Sidebar({ isOpen = true }: { isOpen?: boolean }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed lg:sticky top-0 left-0 z-40 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header - Hidden on lg+ since we have main header */}
        <div className="lg:hidden border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                UteShop
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="mb-4 px-3">
            <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Quản lý
            </h2>
          </div>

          {items.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "transition-colors",
                      isActive
                        ? "text-white"
                        : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                    )}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span
                      className={cn(
                        "px-2 py-0.5 text-xs font-semibold rounded-full",
                        isActive
                          ? "bg-white text-blue-600"
                          : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-4 h-4 text-white" />}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3 px-3 py-2 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🎯</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Need Help?
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                Check documentation
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
