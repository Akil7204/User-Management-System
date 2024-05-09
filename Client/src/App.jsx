import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import PrivateNavigate from "./Components/PrivateNavigate.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";

function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateNavigate />}>
          <Route path="/signin" element={<SignIn />} />
        </Route>
        <Route element={<PrivateNavigate />}>
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        {/* admin route */}
        <Route path="/admin" element={<AdminLogin />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
