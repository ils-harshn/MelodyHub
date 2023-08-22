import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthLayout } from "./pages/Layouts";
import { useContext } from "react";
import ThemeContext from "./contexts/ThemeContext";
import { Login } from "./pages";

function App() {
  const themeContext = useContext(ThemeContext);

  return (
    <BrowserRouter>
      {/* temp-button */}
      <button
        className="theme-changer"
        onClick={() =>
          themeContext?.toggleTheme(
            themeContext.theme === "light" ? "dark" : "light"
          )
        }
      >
        T
      </button>
      <Routes>
        <Route path="accounts" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
