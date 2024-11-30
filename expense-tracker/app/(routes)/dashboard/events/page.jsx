"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "C:/Sushi/Project/expense-tracker1/expense-tracker/utils/dbConfig.jsx"; 
import { Events } from "C:/Sushi/Project/expense-tracker1/expense-tracker/utils/schema.jsx"; 
import { eq } from "drizzle-orm";
import { toast } from "sonner";
import AddEventModal from "C:/Sushi/Project/expense-tracker1/expense-tracker/app/(routes)/dashboard/events/_components/AddEvents.jsx"; 
import ConfirmDeleteModal from "C:/Sushi/Project/expense-tracker1/expense-tracker/app/(routes)/dashboard/events/_components/ConfirmDeleteModel.jsx"; 

const CalendarPage = () => {
  const { user } = useUser();
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAddEventOpen, setAddEventOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Fetch events for the calendar
  const fetchEvents = async () => {
    try {
      const fetchedEvents = await db
        .select()
        .from(Events)
        .where(eq(Events.createdBy, user?.primaryEmailAddress?.emailAddress));
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    if (user) fetchEvents();
  }, [user]);

  // Add Event Handler
  const handleAddEvent = async (eventName, eventType) => {
    if (!eventName || !eventType || !selectedDate) {
      toast.error("Please fill out all fields.");
      return;
    }
    try {
      const newEvent = {
        name: eventName,
        type: eventType,
        date: selectedDate,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      };
      const result = await db.insert(Events).values(newEvent).returning();
      if (result) {
        toast.success("Event added successfully!");
        fetchEvents();
      }
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error("Failed to add event.");
    }
    setAddEventOpen(false);
  };

  // Delete Event Handler
  const handleDeleteEvent = async (eventId) => {
    try {
      await db.delete(Events).where(eq(Events.id, eventId));
      toast.success("Event deleted successfully!");
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event.");
    }
    setDeleteModalOpen(false);
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysArray = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(null); 
    }
   
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(new Date(year, month, i));
    }
    return daysArray;
  };

  const checkForTodayEvents = () => {
    const today = new Date().toDateString(); 
    const todayEvents = events.filter((event) => new Date(event.date).toDateString() === today);

    if (todayEvents.length > 0) {
      todayEvents.forEach((event) => {
        toast.info(`Reminder: Today is the last day for ${event.name} ${event.type}!`);
      });
    }
  };

  useEffect(() => {
    if (events.length > 0) {
      checkForTodayEvents(); 
    }
  }, [events]);

  const changeMonth = (direction) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + direction,
      1
    );
    setCurrentDate(newDate);
  };

  const days = getDaysInMonth();

  const renderCalendarDays = () => {
    return days.map((day, index) => {
      if (!day) return <div key={index} className="p-4" />;

      const dayEvents = events.filter(
        (event) => new Date(event.date).toDateString() === day?.toDateString()
      );

      return (
        <div
          key={index}
          className="p-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:scale-105 hover:shadow-xl transition-all relative cursor-pointer"
          onClick={() => {
            setSelectedDate(day);
            setAddEventOpen(true);
          }}
        >
          <p className="text-xl font-bold">{day.getDate()}</p>
          <div className="absolute top-1 right-2 text-sm">
            {dayEvents.length > 0 && (
              <span className="bg-yellow-200 text-black rounded px-2 py-1">
                {dayEvents.length} events
              </span>
            )}
          </div>
          {dayEvents.map((event) => (
            <div
              key={event.id}
              className="mt-2 bg-white text-black rounded-md p-2 flex justify-between items-center"
            >
              <span>{event.name}</span>
              <button
                className="text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEvent(event);
                  setDeleteModalOpen(true);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold text-center mb-6">Your Event Calendar</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          Previous
        </button>
        <h2 className="text-2xl font-semibold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={index} className="font-bold text-lg text-center">
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>

      {isAddEventOpen && (
        <AddEventModal
          onClose={() => setAddEventOpen(false)}
          onSave={handleAddEvent}
        />
      )}

      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          onClose={() => setDeleteModalOpen(false)}
          onDelete={() => handleDeleteEvent(selectedEvent.id)}
        />
      )}
    </div>
  );
};

export default CalendarPage;
