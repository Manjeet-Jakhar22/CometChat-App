import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../theme";

interface TimerProps {
  startTime: number;
  resetKey?: any;
  paused: boolean;
}

export const Timer = ({ resetKey, paused }: TimerProps) => {
  const theme = useTheme();
  const [time, setTime] = useState(0);

  // We'll store our interval here so we can clear it whenever "paused" changes
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /**
   * If you need to reset the timer to 0 whenever `resetKey` changes,
   * for example when user starts a new recording, do it here.
   */
  useEffect(() => {
    // Whenever `resetKey` changes, reset the timer to 0
    setTime(0);
  }, [resetKey]);

  /**
   * Start an interval to increment `time` every second if NOT paused.
   * If paused, clear the interval so time does not continue incrementing.
   */
  useEffect(() => {
    if (!paused) {
      // Not paused -> start counting
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      // Paused -> clear interval, so time is frozen
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup when unmounting or when effect re-runs
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [paused]);

  // Format HH:MM:SS
  const formatTime = useCallback((timeInSeconds: number) => {
    const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(timeInSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={[
          theme.typography.heading4.regular,
          {
            color: theme.color.textPrimary,
          },
        ]}
      >
        {formatTime(time)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
