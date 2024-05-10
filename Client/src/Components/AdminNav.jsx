import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../Redux/Admin/adminSlice";

function AdminNavbar() {
  const { currentAdmin } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const res = window.confirm("Are you sure you want to logout?");
    if (res) {
      await fetch("BackEnd/auth/signout");
      dispatch(signOut());
      navigate("/admin");
    }
  };

  return (
    <nav className="bg-slate-400 flex">
      <h1 className="text-white md:text-4xl font-bold p-6">
        MERN User Management System- Admin
      </h1>
      {currentAdmin ? (
        <button
          className="absolute text-white font-bold p-2 m-6 bg-red-700 md:h-12 rounded-lg right-10"
          onClick={logoutHandler}
        >
          Logout
        </button>
      ) : (
        ""
      )}
    </nav>
  );
}

export default AdminNavbar;
