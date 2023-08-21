import "./App.css";
import { PasswordInput, TextInput } from "./components/Inputs/Inputs";

function App() {
  return (
    <div className="App">
      <PasswordInput placeholder="Enter Password" />
      <hr />
      <TextInput />
      <hr />
      <PasswordInput placeholder="Enter Password" width="full" />
      <hr />
      <TextInput width="full" />
    </div>
  );
}

export default App;
