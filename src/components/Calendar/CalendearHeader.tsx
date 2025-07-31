"use client";

import React from "react";
import { FaChevronLeft } from "react-icons/fa6";

interface CalendarHeaderProps {
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  title: string;
  view: "month" | "week" | "day";
  onViewChange: (view: "month" | "week" | "day") => void;
}

export default function CalendarHeader({
  onPrevious,
  onNext,
  onToday,
  title,
  view,
  onViewChange,
}: CalendarHeaderProps) {
  return (
    <div className="p-4 border-b border-gray-200 rounded-md bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 [&_button]:cursor-pointer">
            <button
              onClick={onPrevious}
              className="border border-gray-300 hover:bg-gray-100 rounded-sm py-2.5 px-3"
            >
              <FaChevronLeft className="h-3 w-3" />
            </button>
            <button
              onClick={onNext}
              className="border border-gray-300 hover:bg-gray-100 rounded-sm py-2.5 px-3"
            >
              <FaChevronLeft className="h-3 w-3 rotate-180" />
            </button>
            <button
              onClick={onToday}
              className="border border-gray-300 hover:bg-gray-100 rounded-sm py-1 px-1.5"
            >
              Today
            </button>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-[14rem] flex bg-gray-100 p-1 rounded-md  [&_button]:py-1.5 [&_button]:px-3 [&_button]:cursor-pointer relative ">
            <div
              className={`bg-black h-[80%] w-1/3 rounded-md absolute transition-transform duration-300 ease-in-out  ${
                view === "month"
                  ? "-translate-x-0.5"
                  : view === "day"
                  ? "translate-x-35.5"
                  : "translate-x-17.5 "
              }`}
            />
            <button
              className={`bg-transparent w-1/3 relative ${
                view === "month" ? " text-white rounded-md" : ""
              }`}
              onClick={() => onViewChange("month")}
            >
              Month
            </button>
            <button
              className={`bg-transparent w-1/3 relative ${
                view === "week" ? "text-white rounded-md" : ""
              }`}
              onClick={() => onViewChange("week")}
            >
              Week
            </button>
            <button
              className={`bg-transparent w-1/3 relative ${
                view === "day" ? " text-white rounded-md" : ""
              }`}
              onClick={() => onViewChange("day")}
            >
              Day
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
