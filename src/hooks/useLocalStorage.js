import { useState, useEffect } from "react";

/**
 * Works exactly like useState, except the value is also persisted
 * in localStorage under `key`, and restored from there on load.
 *
 * This is the ONLY place localStorage is touched in the whole app -
 * every other component just uses `tasks` and `setTasks` like normal state.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch (error) {
      console.error("Failed to read localStorage key:", key, error);
      return initialValue;
    }
  });

  // Runs every time `value` changes, and writes it to localStorage.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to write localStorage key:", key, error);
    }
  }, [key, value]);

  return [value, setValue];
}
