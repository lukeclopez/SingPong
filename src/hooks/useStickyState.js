import React from "react";

export default function useStickyState(defaultValue, key) {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    if (stickyValue !== null && stickyValue !== "undefined") {
      try {
        return JSON.parse(stickyValue);
      } catch (error) {
        console.error("Error parsing localStorage key", key, error);
      }
    }
    return defaultValue;
  });
  React.useEffect(() => {
    if (value !== undefined) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      window.localStorage.removeItem(key);
    }
  }, [key, value]);
  return [value, setValue];
}
