import {useSelector} from "react-redux"
import {Outlet, Navigate} from "react-router-dom"

export default function PrivateAdminRoute() {
   const {currentAdmin} = useSelector(state => state.admin);

  return currentAdmin ? <Outlet /> : <Navigate to="/admin" />
}
