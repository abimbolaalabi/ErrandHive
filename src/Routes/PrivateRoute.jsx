import { Navigate, Outlet } from "react-router-dom";
import { getStoredJson } from "../utils/storage";

const PrivateRoute = ({ allowedRole }) => {
  const token = localStorage.getItem("userToken");
  const userDetails = getStoredJson("userDetails", null);

  
  if (!token || !userDetails) {
    return <Navigate to="/login" replace />;
  }


  if (allowedRole && userDetails?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
