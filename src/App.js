import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./pages/Layouts/AuthLayout";
import Login from "./pages/Login/Login";
import Layout from "./pages/Layouts/Layout";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Register from "./pages/Register/Register";
import VerifyOTP from "./pages/VerifyOTP/VerifyOTP";
import Library from "./pages/Library";
import LikedSongPage from "./pages/LikedSong";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/search/" element={<Search />} />
          <Route path="/library/" element={<Library />} />
          <Route path="/likedsongs/" element={<LikedSongPage />} />
        </Route>
        <Route path="accounts" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verifyOTP" element={<VerifyOTP />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
