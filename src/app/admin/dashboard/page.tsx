"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  DollarSign,
  Users,
  Package,
  Eye,
} from "lucide-react";
import StatCard from "@/app/admin/dashboard/_components/stat-card";

const mockData = {
  stats: {
    orders: 1234,
    revenue: 45678,
    users: 8901,
    products: 567,
    ordersChange: 12.5,
    revenueChange: 8.3,
    usersChange: -3.2,
    productsChange: 5.1,
  },
  recentOrders: [
    {
      id: "#ORD-001",
      customer: "Nguyễn Văn A",
      total: 299.99,
      status: "Completed",
      date: "2025-10-24",
      items: 3,
    },
    {
      id: "#ORD-002",
      customer: "Trần Thị B",
      total: 149.5,
      status: "Pending",
      date: "2025-10-24",
      items: 1,
    },
    {
      id: "#ORD-003",
      customer: "Lê Văn C",
      total: 599.0,
      status: "Processing",
      date: "2025-10-23",
      items: 5,
    },
    {
      id: "#ORD-004",
      customer: "Phạm Thị D",
      total: 89.99,
      status: "Completed",
      date: "2025-10-23",
      items: 2,
    },
    {
      id: "#ORD-005",
      customer: "Hoàng Văn E",
      total: 449.99,
      status: "Shipped",
      date: "2025-10-22",
      items: 4,
    },
  ],
  products: [
    {
      id: "PRD-001",
      name: "iPhone 15 Pro Max",
      price: 1299.99,
      stock: 45,
      sold: 128,
      category: "Electronics",
    },
    {
      id: "PRD-002",
      name: "Samsung Galaxy S24",
      price: 999.99,
      stock: 67,
      sold: 94,
      category: "Electronics",
    },
    {
      id: "PRD-003",
      name: "MacBook Pro M3",
      price: 2499.99,
      stock: 23,
      sold: 56,
      category: "Computers",
    },
    {
      id: "PRD-004",
      name: "AirPods Pro 2",
      price: 249.99,
      stock: 156,
      sold: 342,
      category: "Audio",
    },
  ],
  users: [
    {
      id: "USR-001",
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      role: "Customer",
      orders: 15,
      spent: 2450.5,
    },
    {
      id: "USR-002",
      name: "Trần Thị B",
      email: "tranthib@email.com",
      role: "Customer",
      orders: 8,
      spent: 1280.0,
    },
    {
      id: "USR-003",
      name: "Lê Văn C",
      email: "levanc@email.com",
      role: "Admin",
      orders: 0,
      spent: 0,
    },
    {
      id: "USR-004",
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      role: "Customer",
      orders: 23,
      spent: 4567.8,
    },
  ],
  salesChart: [
    { month: "May", sales: 32000 },
    { month: "Jun", sales: 41000 },
    { month: "Jul", sales: 38000 },
    { month: "Aug", sales: 47000 },
    { month: "Sep", sales: 43000 },
    { month: "Oct", sales: 51000 },
  ],
};

const Dashboard = () => {
  const { stats, recentOrders, products, users, salesChart } = mockData;
  const [timeRange, setTimeRange] = useState("month");

  const StatusBadge = ({ status }) => {
    const styles = {
      Completed:
        "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
      Pending:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
      Processing:
        "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      Shipped:
        "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          styles[status] || "bg-gray-100 text-gray-700"
        }`}
      >
        {status}
      </span>
    );
  };

  const maxSales = Math.max(...salesChart.map((d) => d.sales));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6">
      <div className="px-6 pb-6 w-full max-w-full mx-auto space-y-6">
        {/* Time Range Selector */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Dashboard Overview
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Track your business performance
            </p>
          </div>
          <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
            {["day", "week", "month", "year"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  timeRange === range
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Orders"
            value={stats.orders}
            change={stats.ordersChange}
            icon={ShoppingCart}
          />
          <StatCard
            title="Revenue"
            value={stats.revenue}
            change={stats.revenueChange}
            icon={DollarSign}
            prefix="$"
          />
          <StatCard
            title="Total Users"
            value={stats.users}
            change={stats.usersChange}
            icon={Users}
          />
          <StatCard
            title="Products"
            value={stats.products}
            change={stats.productsChange}
            icon={Package}
          />
        </div>

        {/* Sales Chart & Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6 bg-white dark:bg-gray-800 border-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Sales Analytics
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Monthly revenue overview
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {salesChart.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      {item.month}
                    </span>
                    <span className="text-gray-900 dark:text-white font-semibold">
                      ${item.sales.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                      style={{ width: `${(item.sales / maxSales) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0">
            <h3 className="text-lg font-bold mb-6">Quick Insights</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Conversion Rate</p>
                  <p className="text-2xl font-bold">3.24%</p>
                </div>
                <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Avg Order Value</p>
                  <p className="text-2xl font-bold">$337.80</p>
                </div>
                <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Views</p>
                  <p className="text-2xl font-bold">45.2K</p>
                </div>
                <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                  <Eye className="w-6 h-6" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Orders & Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-white dark:bg-gray-800 border-0">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Recent Orders
              </h3>
              <button className="text-sm text-blue-500 hover:text-blue-600 font-semibold">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                    <th className="pb-3 font-semibold">Order ID</th>
                    <th className="pb-3 font-semibold">Customer</th>
                    <th className="pb-3 font-semibold">Total</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="py-4 font-medium text-gray-900 dark:text-white">
                        {order.id}
                      </td>
                      <td className="py-4 text-gray-600 dark:text-gray-400">
                        {order.customer}
                      </td>
                      <td className="py-4 font-semibold text-gray-900 dark:text-white">
                        ${order.total}
                      </td>
                      <td className="py-4">
                        <StatusBadge status={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-gray-800 border-0">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Top Products
              </h3>
              <button className="text-sm text-blue-500 hover:text-blue-600 font-semibold">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {product.category} • {product.sold} sold
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">
                      ${product.price}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {product.stock} in stock
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Users */}
        <Card className="p-6 bg-white dark:bg-gray-800 border-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Recent Users
            </h3>
            <button className="text-sm text-blue-500 hover:text-blue-600 font-semibold">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    {user.orders} orders
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${user.spent.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
