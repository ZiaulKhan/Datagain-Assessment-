"use client";

import React from "react";
import { CalendarEvent } from "@/types/calendar";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface WeekViewProps {
  currentMonth: number;
  currentYear: number;
  selectedDate: string | null;
  events: CalendarEvent[];
  onDateClick: (day: number) => void;
}

export default function WeekView({
  currentMonth,
  currentYear,
  selectedDate,
  events,
  onDateClick,
}: WeekViewProps) {
  const getCurrentWeekStart = () => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay());
      return startOfWeek;
    }

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    return startOfWeek;
  };

  const getCurrentWeekDates = () => {
    const startOfWeek = getCurrentWeekStart();

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const weekDates = getCurrentWeekDates();

  return (
    <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
      {dayNames.map((day) => (
        <div
          key={day}
          className="bg-gray-50 p-3 text-center text-sm font-medium text-gray-700 border-b border-gray-200"
        >
          {day}
        </div>
      ))}

      {weekDates.map((date, index) => {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`;
        const dayEvents = events.filter((event) => event.date === dateStr);
        const isToday =
          day === new Date().getDate() &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear();
        const isCurrentMonth = month === currentMonth && year === currentYear;

        return (
          <div
            key={index}
            onClick={() => onDateClick(day)}
            className={`h-32 border border-gray-100 p-2 cursor-pointer hover:bg-blue-100/40 transition-colors relative ${
              isToday && "bg-blue-100/50 border-blue-300"
            } ${!isCurrentMonth && "bg-gray-50 text-gray-400"}`}
          >
            <div
              className={`text-sm font-medium mb-2 ${
                isToday
                  ? "text-blue-700"
                  : isCurrentMonth
                  ? "text-gray-700"
                  : "text-gray-400"
              }`}
            >
              {day}
            </div>
            <div className="space-y-1">
              {dayEvents.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className={`text-xs px-1 py-0.5 rounded truncate ${
                    event.type === "event"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                  title={event.title}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 3 && (
                <div className="text-xs text-gray-500">
                  +{dayEvents.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
