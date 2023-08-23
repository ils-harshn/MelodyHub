import "./App.css";
import { useContext } from "react";
import ThemeContext from "./contexts/ThemeContext";
import AppRouter from "./router/Router";
import { useJsonHolderData } from "./apis/src/queryHooks";

function App() {
  const themeContext = useContext(ThemeContext);
  const { data, isLoading } = useJsonHolderData({
    onSuccess: (data: any) => {
      console.log(data);
    },
  });

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
