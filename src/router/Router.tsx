import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout, Layout } from "../pages/Layouts/Layouts";
import * as routes from "./routes";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Search from "../pages/Search/Search";
import Library from "../pages/Library/Library";
import Album from "../pages/Albums/Album";
import Artist from "../pages/Artists/Artist";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* INDEX NESTED */}
        <Route path={routes.INDEX.path} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={routes.HOME.path} element={<Home />} />
          <Route path={routes.HOME.path} element={<Home />} />
          <Route path={routes.SEARCH.path} element={<Search />} />
          <Route path={routes.LIBRARY.path} element={<Library />} />
          <Route
            path={routes.CREATE_PLAYLIST.path}
            element={<h2>CREATE_PLAYLIST</h2>}
          />
          <Route
            path={routes.LIKED_SONGS.path}
            element={<h2>LIKED_SONGS</h2>}
          />
          {/* INDEX - ALBUM_NESTED */}
          <Route path={routes.ALBUM_NESTED.path}>
            <Route index element={<Album />} />
            <Route path={routes.ALBUM.path} element={<Album />} />
          </Route>

          {/* INDEX - ARTIST_NESTED */}
          <Route path={routes.ARTIST_NESTED.path}>
            <Route index element={<Artist />} />
            <Route path={routes.ARTIST.path} element={<Artist />} />
          </Route>

          {/* Page Not Found */}
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* AUTH_LAYOUT NESTED */}
        <Route path={routes.AUTH_LAYOUT.path} element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path={routes.LOGIN.path} element={<Login />} />

          {/* Page Not Found */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Page Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
