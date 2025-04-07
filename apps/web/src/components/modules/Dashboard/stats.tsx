"use client";

import {
  IconAward,
  IconCards,
  IconFlame,
  IconMenu3,
  IconTarget,
} from "@tabler/icons-react";
import React from "react";
import { NumberTicker } from "@highschool/components";

import { useDashboard } from "@/hooks/use-user-dashboard";

export const Stats = () => {
  const { stats } = useDashboard();

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
            <p className="text-2xl font-bold">
              <NumberTicker
                className="text-2xl font-bold"
                value={stats.currentStreak}
              />{" "}
              {""}
              ngày
            </p>
          </div>
        </div>

        <div className="flex items-center rounded-lg bg-white p-6 shadow">
          <div className="mr-4 rounded-full bg-purple-100 p-3">
            <IconAward className="size-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Chuỗi Dài Nhất</p>
            <p className="text-2xl font-bold">
              <NumberTicker
                className="text-2xl font-bold"
                value={stats.longestStreak}
              />{" "}
              ngày
            </p>
          </div>
        </div>

        <div className="flex items-center rounded-lg bg-white p-6 shadow">
          <div className="mr-4 rounded-full bg-blue-100 p-3">
            <IconCards className="size-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Tổng bộ thẻ</p>
            <p className="text-2xl font-bold">
              <NumberTicker
                className="text-2xl font-bold"
                value={stats.totalFlashcard}
              />
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-2 flex items-center">
            <div className="mr-4 rounded-full bg-green-100 p-3">
              <IconTarget className="size-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tổng thẻ ghi nhớ</p>
              <p className="text-2xl font-bold">
                <NumberTicker
                  className="text-2xl font-bold"
                  value={stats.totalFlashcard}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
