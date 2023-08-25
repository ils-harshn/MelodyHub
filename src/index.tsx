import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./contexts/ThemeContext";
import BaseQueryProvider from "./apis";
import { MusicPlayerProvider } from "./hooks/MusicPlayerHooks";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <MusicPlayerProvider>
    <BaseQueryProvider>
      <ThemeProvider currentTheme="dark">
        <App />
      </ThemeProvider>
    </BaseQueryProvider>
  </MusicPlayerProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
