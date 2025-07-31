import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CalendarEvent, CalendarState } from "@/types/calendar";

const initialState: CalendarState = {
  events: [],
  selectedDate: null,
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  view: "month",
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addEvent: (
      state,
      action: PayloadAction<Omit<CalendarEvent, "id" | "createdAt">>
    ) => {
      const newEvent: CalendarEvent = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      state.events.push(newEvent);
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
    },
    setCurrentMonth: (state, action: PayloadAction<number>) => {
      state.currentMonth = action.payload;
    },
    setCurrentYear: (state, action: PayloadAction<number>) => {
      state.currentYear = action.payload;
    },
    setView: (state, action: PayloadAction<"month" | "week" | "day">) => {
      state.view = action.payload;
    },
    setCurrentWeek: (
      state,
      action: PayloadAction<{ year: number; month: number; day: number }>
    ) => {
      state.currentYear = action.payload.year;
      state.currentMonth = action.payload.month;
      // Store the day for week/day view reference
      state.selectedDate = `${action.payload.year}-${String(
        action.payload.month + 1
      ).padStart(2, "0")}-${String(action.payload.day).padStart(2, "0")}`;
    },
    setCurrentDay: (
      state,
      action: PayloadAction<{ year: number; month: number; day: number }>
    ) => {
      state.currentYear = action.payload.year;
      state.currentMonth = action.payload.month;
      state.selectedDate = `${action.payload.year}-${String(
        action.payload.month + 1
      ).padStart(2, "0")}-${String(action.payload.day).padStart(2, "0")}`;
    },
  },
});

export const {
  addEvent,
  removeEvent,
  setSelectedDate,
  setCurrentMonth,
  setCurrentYear,
  setView,
  setCurrentWeek,
  setCurrentDay,
} = calendarSlice.actions;

export default calendarSlice.reducer;
