import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./pages/Layouts/AuthLayout";
import Login from "./pages/Login/Login";
import Layout from "./pages/Layouts/Layout";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
        </Route>
        <Route path="accounts" element={<AuthLayout/>}>
          <Route path="login" element={<Login/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
