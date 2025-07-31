"use client";

import React from "react";
import { CalendarEvent } from "@/types/calendar";

interface DayViewProps {
  selectedDate: string | null;
  events: CalendarEvent[];
  onDateClick: (day: number) => void;
}

export default function DayView({
  selectedDate,
  events,
  onDateClick,
}: DayViewProps) {
  const getCurrentDayDate = () => {
    if (selectedDate) {
      return new Date(selectedDate);
    }
    return new Date();
  };

  const today = getCurrentDayDate();
  const day = today.getDate();
  const dateStr = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const dayEvents = events.filter((event) => event.date === dateStr);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col ">
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          {today.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h3>
      </div>

      <div className="p-4">
        {dayEvents.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">
              No events or reminders for today
            </p>
            <button
              onClick={() => onDateClick(day)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-1 px-2 cursor-pointer rounded-md"
            >
              Add Event or Reminder
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-col gap-3 overflow-auto">
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className={`p-3 rounded-lg border-l-4 ${
                    event.type === "event"
                      ? "bg-blue-50 border-blue-400"
                      : "bg-orange-50 border-orange-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4
                      className={`font-medium
                    ${
                      event.type === "event"
                        ? "text-blue-800"
                        : "text-orange-800"
                    }`}
                    >
                      {event.title}
                    </h4>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        event.type === "event"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {event.type}
                    </span>
                  </div>
                  {event.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {event.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-200 ">
              <button
                onClick={() => onDateClick(day)}
                className="w-full cursor-pointer"
              >
                Add Another Event or Reminder
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
