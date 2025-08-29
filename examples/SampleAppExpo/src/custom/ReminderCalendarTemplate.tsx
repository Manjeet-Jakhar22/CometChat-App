// CalendarComponent.tsx
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface CalendarProps {
  value?: Date | null;
  onDateSelect: (date: Date | null) => void;
  onClose?: () => void; // Optional: Call when dismissed
}

const CalendarComponent: React.FC<CalendarProps> = ({ value, onDateSelect, onClose }) => {
  const [showPicker, setShowPicker] = useState(true);
  const [selectedDate, setSelectedDate] = useState(value || new Date());

  useEffect(() => {
    setShowPicker(true); // mimic auto-open on mount
  }, []);

  const handleChange = (event: any, date?: Date) => {
    if (event.type === "dismissed") {
      setShowPicker(false);
      onClose?.();
      return;
    }

    const pickedDate = date || selectedDate;
    setSelectedDate(pickedDate);
    setShowPicker(false);
    onDateSelect(pickedDate);
  };

  return (
    <>
      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="datetime"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={handleChange}
          {...(Platform.OS !== "ios" ? { is24Hour: false } : {})}
        />
      )}
    </>
  );
};

export default CalendarComponent;
