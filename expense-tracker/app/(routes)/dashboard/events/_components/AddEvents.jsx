import React, { useState } from "react";
import { toast } from "sonner";

const AddEventModal = ({ onClose, onSave }) => {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [error, setError] = useState("");

  const eventTypes = ["Bills", "EMI", "Loans", "Income", "Fees", "Others"];

  const handleSave = () => {
    if (!eventName.trim() || !eventType) {
      setError("Both fields are required.");
      return;
    }

    onSave(eventName.trim(), eventType);
    setEventName("");
    setEventType("");
    setError("");
    toast.success("Event saved successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50">
      <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold text-white mb-4">Add Event</h2>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label
            htmlFor="eventName"
            className="block text-sm font-semibold text-gray-300 mb-1"
          >
            Event Name
          </label>
          <input
            type="text"
            id="eventName"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => {
              setEventName(e.target.value);
              setError("");
            }}
            className="border p-2 w-full rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="eventType"
            className="block text-sm font-semibold text-gray-300 mb-1"
          >
            Event Type
          </label>
          <select
            id="eventType"
            value={eventType}
            onChange={(e) => {
              setEventType(e.target.value);
              setError("");
            }}
            className="border p-2 w-full rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="" disabled>
              Select event type
            </option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-all"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
            onClick={handleSave}
          >
            Save Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;
