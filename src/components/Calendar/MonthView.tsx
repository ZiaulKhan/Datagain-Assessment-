"use client";

import React from "react";
import { CalendarEvent } from "@/types/calendar";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface MonthViewProps {
  currentMonth: number;
  currentYear: number;
  events: CalendarEvent[];
  onDateClick: (day: number) => void;
}

export default function MonthView({
  currentMonth,
  currentYear,
  events,
  onDateClick,
}: MonthViewProps) {
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateStr);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-20 border border-gray-100"></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      const isToday =
        day === new Date().getDate() &&
        currentMonth === new Date().getMonth() &&
        currentYear === new Date().getFullYear();

      days.push(
        <div
          key={day}
          onClick={() => onDateClick(day)}
          className={`h-20 border border-gray-100 p-1 cursor-pointer hover:bg-blue-100/40 transition-colors relative ${
            isToday && "bg-blue-100/50 border-blue-300"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <div
              className={`text-sm font-medium ${
                isToday ? "text-blue-700" : "text-gray-700"
              }`}
            >
              {day}
            </div>
            {dayEvents.length > 2 && (
              <div className="text-[0.6rem] text-gray-500">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
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
          </div>
        </div>
      );
    }

    return days;
  };

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

      {renderCalendarDays()}
    </div>
  );
}
