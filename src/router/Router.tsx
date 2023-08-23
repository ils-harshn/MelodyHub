import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "../pages/Layouts";
import { Login } from "../pages";
import * as routes from "./routes";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.AUTH_LAYOUT.path} element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path={routes.LOGIN.path} element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
