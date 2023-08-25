import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout, Layout } from "../pages/Layouts/Layouts";
import * as routes from "./routes";
import Login from "../pages/Login";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* INDEX NESTED */}
        <Route path={routes.INDEX.path} element={<Layout />}>
          <Route index element={<h3>Home</h3>} />
          <Route path={routes.HOME.path} element={<h3>Home</h3>} />
        </Route>
        {/* AUTH_LAYOUT NESTED */}
        <Route path={routes.AUTH_LAYOUT.path} element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path={routes.LOGIN.path} element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
