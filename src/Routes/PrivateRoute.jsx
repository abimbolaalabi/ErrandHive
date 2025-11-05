import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRole }) => {
  const token = localStorage.getItem("userToken");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  
  if (!token || !userDetails) {
    return <Navigate to="/login" replace />;
  }


  if (allowedRole && userDetails?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
