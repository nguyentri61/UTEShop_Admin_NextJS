"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

type StatCardProps = {
  title: string;
  value: number | string;
  change: number;
  icon: React.ElementType;
  prefix?: string;
  suffix?: string;
};

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  prefix = "",
  suffix = "",
}: StatCardProps) {
  const isPositive = change > 0;

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border-0 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div
          className={`flex items-center text-sm font-semibold ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-4 h-4 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 mr-1" />
          )}
          {Math.abs(change)}%
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          {title}
        </p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {prefix}
          {typeof value === "number"
            ? value.toLocaleString("en-US") // Chỉ định locale rõ ràng
            : value}
          {suffix}
        </p>
      </div>
    </Card>
  );
}
