import "./App.css";
import { PasswordInput, TextInput } from "./components/Inputs/Inputs";
import { useContext } from "react";
import ThemeContext from "./contexts/ThemeContext";
import { Button } from "./components/Buttons/buttons";

function App() {
  const themeContextValue = useContext(ThemeContext);

  return (
    <div className="App">
      <PasswordInput placeholder="Enter Password" />
      <hr />
      <TextInput />
      <hr />
      <PasswordInput placeholder="Enter Password" width="full" />
      <hr />
      <TextInput width="full" />
      <hr />
      <Button
        onClick={() => {
          themeContextValue?.toggleTheme(
            themeContextValue?.theme === "light" ? "dark" : "light"
          );
        }}
      >
        Button
      </Button>
    </div>
  );
}

export default App;
