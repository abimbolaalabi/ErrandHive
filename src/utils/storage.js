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
