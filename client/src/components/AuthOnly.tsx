import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";


function AuthOnly ({children}:any) {
  const isAuth = useAuth();
  return isAuth ? children : <Navigate to="/auth/login" />;
};

export default AuthOnly;
