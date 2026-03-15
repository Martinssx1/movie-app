import { useContext, createContext, useState, useEffect } from "react";

const UseTheme = createContext(undefined);
function Theme({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme
      ? JSON.parse(savedTheme)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  function toogleTheme() {
    setTheme((prev) => !prev);
  }
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
    const root = document.documentElement;
    root.classList.toggle("dark", theme);
  }, [theme]);
  return (
    <UseTheme.Provider value={{ toogleTheme, theme }}>
      {children}
    </UseTheme.Provider>
  );
}
export default Theme;
export function GlobalTheme() {
  const overTheme = useContext(UseTheme);
  if (!overTheme) {
    throw new Error("check for Provider");
  }
  return overTheme;
}
