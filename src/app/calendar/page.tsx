"use client";

import React, { useState } from "react";
import {
  setCurrentDay,
  setCurrentMonth,
  setCurrentWeek,
  setCurrentYear,
  setSelectedDate,
  setView,
} from "@/redux/slices/calendarSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AddEventReminderModal from "@/components/Calendar/EventModal";
import CalendarHeader from "@/components/Calendar/CalendearHeader";
import MonthView from "@/components/Calendar/MonthView";
import WeekView from "@/components/Calendar/WeekView";
import DayView from "@/components/Calendar/DayView";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Calendar() {
  const dispatch = useDispatch();
  const { events, currentMonth, currentYear, view, selectedDate } = useSelector(
    (state: RootState) => state.calendar
  );
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDateForModal, setSelectedDateForModal] = useState<string>("");

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      dispatch(setCurrentMonth(11));
      dispatch(setCurrentYear(currentYear - 1));
    } else {
      dispatch(setCurrentMonth(currentMonth - 1));
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      dispatch(setCurrentMonth(0));
      dispatch(setCurrentYear(currentYear + 1));
    } else {
      dispatch(setCurrentMonth(currentMonth + 1));
    }
  };

  const handlePrevWeek = () => {
    const currentWeekStart = getCurrentWeekStart();
    const prevWeek = new Date(currentWeekStart);
    prevWeek.setDate(currentWeekStart.getDate() - 7);

    dispatch(
      setCurrentWeek({
        year: prevWeek.getFullYear(),
        month: prevWeek.getMonth(),
        day: prevWeek.getDate(),
      })
    );
  };

  const handleNextWeek = () => {
    const currentWeekStart = getCurrentWeekStart();
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(currentWeekStart.getDate() + 7);

    dispatch(
      setCurrentWeek({
        year: nextWeek.getFullYear(),
        month: nextWeek.getMonth(),
        day: nextWeek.getDate(),
      })
    );
  };

  const handlePrevDay = () => {
    const currentDay = getCurrentDayDate();
    const prevDay = new Date(currentDay);
    prevDay.setDate(currentDay.getDate() - 1);

    dispatch(
      setCurrentDay({
        year: prevDay.getFullYear(),
        month: prevDay.getMonth(),
        day: prevDay.getDate(),
      })
    );
  };

  const handleNextDay = () => {
    const currentDay = getCurrentDayDate();
    const nextDay = new Date(currentDay);
    nextDay.setDate(currentDay.getDate() + 1);

    dispatch(
      setCurrentDay({
        year: nextDay.getFullYear(),
        month: nextDay.getMonth(),
        day: nextDay.getDate(),
      })
    );
  };

  const getCurrentWeekStart = () => {
    if (selectedDate && (view === "week" || view === "day")) {
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

  const handleDateClick = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    setSelectedDateForModal(dateStr);
    dispatch(setSelectedDate(dateStr));
    setShowEventModal(true);
  };

  const getCurrentDayDate = () => {
    if (selectedDate && view === "day") {
      return new Date(selectedDate);
    }
    return new Date();
  };

  const goToToday = () => {
    const today = new Date();
    if (view === "month") {
      dispatch(setCurrentMonth(today.getMonth()));
      dispatch(setCurrentYear(today.getFullYear()));
    } else if (view === "week") {
      dispatch(
        setCurrentWeek({
          year: today.getFullYear(),
          month: today.getMonth(),
          day: today.getDate(),
        })
      );
    } else if (view === "day") {
      dispatch(
        setCurrentDay({
          year: today.getFullYear(),
          month: today.getMonth(),
          day: today.getDate(),
        })
      );
    }
  };

  const getTitle = () => {
    switch (view) {
      case "week":
        return `Week of ${getCurrentWeekStart().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}`;
      case "day":
        return getCurrentDayDate().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      default:
        return `${monthNames[currentMonth]} ${currentYear}`;
    }
  };

  const getNavigationHandlers = () => {
    switch (view) {
      case "week":
        return { onPrevious: handlePrevWeek, onNext: handleNextWeek };
      case "day":
        return { onPrevious: handlePrevDay, onNext: handleNextDay };
      default:
        return { onPrevious: handlePrevMonth, onNext: handleNextMonth };
    }
  };

  const { onPrevious, onNext } = getNavigationHandlers();

  return (
    <div className="flex-1 ">
      <CalendarHeader
        onPrevious={onPrevious}
        onNext={onNext}
        onToday={goToToday}
        title={getTitle()}
        view={view}
        onViewChange={(newView) => dispatch(setView(newView))}
      />

      <div className="p-4 h-full bg-white">
        {view === "month" && (
          <MonthView
            currentMonth={currentMonth}
            currentYear={currentYear}
            events={events}
            onDateClick={handleDateClick}
          />
        )}

        {view === "week" && (
          <WeekView
            currentMonth={currentMonth}
            currentYear={currentYear}
            selectedDate={selectedDate}
            events={events}
            onDateClick={handleDateClick}
          />
        )}

        {view === "day" && (
          <DayView
            selectedDate={selectedDate}
            events={events}
            onDateClick={handleDateClick}
          />
        )}
      </div>

      <AddEventReminderModal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        selectedDate={selectedDateForModal}
      />
    </div>
  );
}
