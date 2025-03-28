"use client";

import {
  IconAward,
  IconCalendar,
  IconFlame,
  IconMenu3,
  IconTarget,
} from "@tabler/icons-react";
import React from "react";

import { useDashboard } from "@/hooks/use-user-dashboard";

export const Stats = () => {
  const { stats } = useDashboard();
  const progress = Math.min(
    (stats.totalContributions / stats.contributionGoal) * 100,
    100,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-2">
        <IconMenu3 size={24} />
        <h2 className="text-3xl font-semibold">Tổng quan</h2>
      </div>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="flex items-center rounded-lg bg-white p-6 shadow">
          <div className="mr-4 rounded-full bg-orange-100 p-3">
            <IconFlame className="size-6 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Chuỗi Hiện Tại</p>
            <p className="text-2xl font-bold">{stats.currentStreak} ngày</p>
          </div>
        </div>

        <div className="flex items-center rounded-lg bg-white p-6 shadow">
          <div className="mr-4 rounded-full bg-purple-100 p-3">
            <IconAward className="size-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Chuỗi Dài Nhất</p>
            <p className="text-2xl font-bold">{stats.longestStreak} ngày</p>
          </div>
        </div>

        <div className="flex items-center rounded-lg bg-white p-6 shadow">
          <div className="mr-4 rounded-full bg-blue-100 p-3">
            <IconCalendar className="size-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Tổng Bài Học</p>
            <p className="text-2xl font-bold">{stats.totalContributions}</p>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-2 flex items-center">
            <div className="mr-4 rounded-full bg-green-100 p-3">
              <IconTarget className="size-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tiến Độ Mục Tiêu</p>
              <p className="text-2xl font-bold">{Math.round(progress)}%</p>
            </div>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-green-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
