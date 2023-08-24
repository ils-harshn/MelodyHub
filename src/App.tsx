import "./App.css";
import { useContext } from "react";
import ThemeContext from "./contexts/ThemeContext";
import AppRouter from "./router/Router";

function App() {
  const themeContext = useContext(ThemeContext);

  return (
    <>
      {/* temp-button */}
      <button
        className="theme-changer"
        onClick={() =>
          themeContext?.toggleTheme(
            themeContext.theme === "light" ? "dark" : "light"
          )
        }
      >
        {themeContext?.theme === "light" ? "D" : "L"}
      </button>
      <AppRouter />
    </>
  );
}

export default App;
