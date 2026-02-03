export const getInitialTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved) return saved;

  // system fallback
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

export const applyTheme = (theme) => {
  const root = document.documentElement;
  console.log("Applying theme:", theme, "Before classes:", root.className);

  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");

  console.log("After classes:", root.className);
  localStorage.setItem("theme", theme);
};
