import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Set button colors based on theme
  const isLight = theme === "light";
  const buttonStyle = {
    backgroundColor: isLight ? "#f0f0f0" : "#333",
    color: isLight ? "#333" : "#f0f0f0",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: "bold",
  };

  return (
    <button style={buttonStyle} onClick={toggleTheme} aria-label="Toggle theme">
      {isLight ? <Moon size={20} /> : <Sun size={20} />}
      {isLight ? "dark" : "light"}
    </button>
  );
};

export default ThemeToggleButton;
