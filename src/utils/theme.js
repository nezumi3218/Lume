export const getInitialTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved) return saved;
  return "light";
};

export const setTheme = (theme) => {
  localStorage.setItem("theme", theme);
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};
