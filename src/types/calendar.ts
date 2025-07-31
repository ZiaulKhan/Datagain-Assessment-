export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  type: "event" | "reminder";
  createdAt: string;
}

export interface CalendarState {
  events: CalendarEvent[];
  selectedDate: string | null;
  currentMonth: number;
  currentYear: number;
  view: "month" | "week" | "day";
}
