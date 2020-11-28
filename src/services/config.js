export const getTimeLimit = () =>
  parseInt(localStorage.getItem("timeLimit")) + 1 || 61;
export const setTimeLimit = (s) => localStorage.setItem("timeLimit", s);

export const getWordSet = () => localStorage.getItem("wordSet") || "Set 1";
export const setWordSet = (wordSet) => localStorage.setItem("wordSet", wordSet);
