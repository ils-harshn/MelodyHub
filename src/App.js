import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import AuthLayout from "./pages/layouts/AuthLayout";
import ligththeme, { darktheme } from "./styles/themes";
import Layout from "./pages/layouts";
import ThemeChanger from "./components/ThemeChanger";
import { useState } from "react";
import Home from "./pages/Home";

function App() {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [changedTheme, setChangedTheme] = useState(false)
  
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
    setChangedTheme(true)
  }

  return (
    <ThemeProvider theme={currentTheme === 'light' ? ligththeme : darktheme}>
      <GlobalStyles changedTheme={changedTheme} />
      <ThemeChanger toggleTheme={toggleTheme} currentTheme={currentTheme} />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/">
            <Route path="login" element={<AuthLayout />}>
              <Route index element={<LoginPage />} />
            </Route>

            <Route element={<Layout />}>
              <Route index element={<Home />}/>
            </Route>
            
            <Route path="*" element={<h3>No Page Found</h3>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
