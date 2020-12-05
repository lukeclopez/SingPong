const settingsKey = "settings";

const defaultSettings = {
  timeLimit: 61,
  wordSet: "Set 1",
};

export const setSetting = (key, value) => {
  validateKey(key);
  const settings = JSON.parse(localStorage.getItem(settingsKey));
  settings[key] = value;
  window.localStorage.setItem(settings, JSON.stringify(settings));
};

export const getSetting = (key) => {
  validateKey(key);
  const settings = JSON.parse(localStorage.getItem(settingsKey));
  return settings[key] || defaultSettings[key];
};

const validKeys = Object.keys(defaultSettings);
const validateKey = (key) => {
  if (!validKeys.includes(key)) throw new Error("Invalid settings key");
};

if (!localStorage.getItem(settingsKey))
  localStorage.setItem(settingsKey, JSON.stringify(defaultSettings));
