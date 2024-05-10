import {useSelector} from "react-redux"
import {Outlet, Navigate} from "react-router-dom"

export default function PrivateAdminCheck() {
   const {currentAdmin} = useSelector(state => state.admin);

  return currentAdmin ? <Navigate to="/adminDashboard" /> : <Outlet />
  
}