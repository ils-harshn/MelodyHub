import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import AuthLayout from "./pages/layouts/AuthLayout";
import ligththeme from "./styles/themes";

function App() {
  return (
    <ThemeProvider theme={ligththeme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<AuthLayout />}>
              <Route index element={<LoginPage />} />
            </Route>
            <Route path="*" element={<h3>No Page Found</h3>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
