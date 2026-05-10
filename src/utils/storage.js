/**
 * Safely store a value as JSON. Skips storing if value is null/undefined.
 */
export const setStoredJson = (key, value) => {
  if (value === null || value === undefined) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to store "${key}" in localStorage:`, error);
  }
};

/**
 * Safely store a plain string value. Skips storing if value is null/undefined.
 */
export const setStoredValue = (key, value) => {
  if (value === null || value === undefined) return;
  try {
    localStorage.setItem(key, String(value));
  } catch (error) {
    console.error(`Failed to store "${key}" in localStorage:`, error);
  }
};

/**
 * Scrub any keys whose stored value is the literal string "undefined" or "null",
 * or whose value is stored under the wrong key (e.g. a JWT in "userDetails").
 * Call this once at app startup to prevent JSON.parse crashes from stale data.
 */
export const sanitizeStorage = () => {
  try {
    const BAD_VALUES = ["undefined", "null", ""];
    const JSON_KEYS = ["userDetails"];

    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (!key) continue;

      const val = localStorage.getItem(key);

      // Remove keys with known bad literal values
      if (BAD_VALUES.includes(val)) {
        localStorage.removeItem(key);
        continue;
      }

      // Remove JSON keys whose value isn't actually JSON
      if (JSON_KEYS.includes(key) && val) {
        const trimmed = val.trim();
        if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
          localStorage.removeItem(key);
        }
      }
    }
  } catch (error) {
    // sanitize failed silently
  }
};

export const getStoredJson = (key, fallback = null) => {
  const value = localStorage.getItem(key);

  if (
    value === null ||
    value === undefined ||
    value === "" ||
    value === "undefined" ||
    value === "null"
  ) {
    return fallback;
  }

  // If it doesn't look like JSON, skip parsing and return fallback
  const trimmed = value.trim();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
};

export const getStoredString = (key, fallback = "") => {
  const value = localStorage.getItem(key);

  if (
    value === null ||
    value === undefined ||
    value === "" ||
    value === "undefined" ||
    value === "null"
  ) {
    return fallback;
  }

  try {
    const parsedValue = JSON.parse(value);
    return typeof parsedValue === "string" ? parsedValue : value;
  } catch (error) {
    return value;
  }
};

export const getStoredBoolean = (key, fallback = false) => {
  const value = localStorage.getItem(key);

  if (
    value === null ||
    value === undefined ||
    value === "" ||
    value === "undefined" ||
    value === "null"
  ) {
    return fallback;
  }

  if (value === "true") return true;
  if (value === "false") return false;

  try {
    const parsedValue = JSON.parse(value);
    return typeof parsedValue === "boolean" ? parsedValue : fallback;
  } catch (error) {
    return fallback;
  }
};
