import React, { useState } from "react";
import CommonModal from "../common/Modal";
import { FaCalendarDays } from "react-icons/fa6";
import { BsClock } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addEvent } from "@/redux/slices/calendarSlice";
import { BiCalendar } from "react-icons/bi";
import { FiClock } from "react-icons/fi";

interface AddEventReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
}

const AddEventReminderModal: React.FC<AddEventReminderModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
}) => {
  const dispatch = useDispatch();
  const [eventType, setEventType] = useState<"event" | "reminder" | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventType || !title.trim()) return;

    dispatch(
      addEvent({
        title: title.trim(),
        description: description.trim(),
        date: selectedDate,
        type: eventType,
      })
    );

    setTitle("");
    setDescription("");
    setEventType(null);
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setEventType(null);
    onClose();
  };

  const formattedDate = new Date(selectedDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <CommonModal isOpen={isOpen} onClose={handleClose}>
      <div className="p-4 [&_button]:cursor-pointer">
        <h2 className="text-lg font-semibold flex items-center mb-2">
          <FaCalendarDays className="w-5 h-5 mr-2 text-blue-500" />
          Add to {formattedDate}
        </h2>

        {!eventType ? (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              What would you like to add to this date?
            </p>
            <div className="flex gap-4 ">
              <button
                onClick={() => setEventType("event")}
                className="flex-1 p-4 border rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 flex flex-col items-center"
              >
                <FaCalendarDays className="w-6 h-6 mb-1" />
                Add Event
              </button>
              <button
                onClick={() => setEventType("reminder")}
                className="flex-1 p-4 border rounded-lg text-orange-700 bg-orange-50 hover:bg-orange-100 flex flex-col items-center"
              >
                <BsClock className="w-6 h-6 mb-1" />
                Add Reminder
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              {eventType === "event" ? (
                <>
                  <BiCalendar className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-700">
                    Creating Event
                  </span>
                </>
              ) : (
                <>
                  <FiClock className="h-5 w-4.5 text-orange-600" />
                  <span className="font-medium text-orange-700">
                    Creating Reminder
                  </span>
                </>
              )}
            </div>

            <div className="space-y-2 flex flex-col">
              <label htmlFor="title">Title *</label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`Enter ${eventType} title`}
                required
                className="border border-gray-300 px-3 py-2 rounded-md"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={`Enter ${eventType} description (optional)`}
                rows={3}
                className="border border-gray-300 px-3 py-2 rounded-md"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4 ">
              <button
                type="button"
                onClick={() => setEventType(null)}
                className="px-4 py-2 border rounded-lg  flex flex-col items-center border-gray-300 hover:bg-gray-100"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!title.trim()}
                className={`px-4 py-2 border rounded-lg  flex flex-col items-center ${
                  eventType === "event"
                    ? " text-blue-700 bg-blue-50 hover:bg-blue-100"
                    : " text-orange-700 bg-orange-50 hover:bg-orange-100"
                }`}
              >
                Create {eventType === "event" ? "Event" : "Reminder"}
              </button>
            </div>
          </form>
        )}
      </div>
    </CommonModal>
  );
};

export default AddEventReminderModal;
