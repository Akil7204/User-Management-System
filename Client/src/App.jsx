import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import PrivateNavigate from "./Components/PrivateNavigate.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EditUser from "./pages/EditUser.jsx";
import AddUser from "./pages/AddUser.jsx";
import PrivateAdminRoute from "./Components/PrivateAdminRoute.jsx";
import PrivateAdminCheck from "./Components/PrivateAdminCheck.jsx";

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

        <Route element={<PrivateAdminCheck />}>
          <Route path="/admin" element={<AdminLogin />} />
        </Route>

        <Route element={<PrivateAdminRoute />}>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
        </Route>
        <Route element={<PrivateAdminRoute />}>
          <Route path="/admin/edit" element={<EditUser />} />
        </Route>
        <Route element={<PrivateAdminRoute />}>
          <Route path="/admin/add" element={<AddUser />} />
        </Route>



      </Routes>
    </BrowserRouter>
  );
}

export default App;
