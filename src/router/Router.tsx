import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout, Layout } from "../pages/Layouts/Layouts";
import * as routes from "./routes";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* INDEX NESTED */}
        <Route path={routes.INDEX.path} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={routes.HOME.path} element={<Home />} />
          <Route path={routes.SEARCH.path} element={<h2>Search</h2>} />
          <Route path={routes.LIBRARY.path} element={<h2>Library</h2>} />
          <Route path={routes.CREATE_PLAYLIST.path} element={<h2>CREATE_PLAYLIST</h2>} />
          <Route path={routes.LIKED_SONGS.path} element={<h2>LIKED_SONGS</h2>} />
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
