import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "../components/Form";
import authViewImage from "../assets/authViewBg.jpg";
import { useNavigate} from "react-router";
import useAuth from "../hooks/useAuth";

const Auth :React.FC = () => {
  const navigate = useNavigate();
  const [isAuth,setIsAuth] = useAuth()


  useEffect(() => {
    if (isAuth) navigate("/dashboard");
  }, []);

  return (
    <div className="auth-view">
      <div className="auth-view__form">
        <p className="form__title">Welcome to Our Website </p>
        <div className="form__links">
          <Link to="/auth/login" className="active">
            Login
          </Link>
          <p>{">"}</p>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <Form name="Login"></Form>
        <p className="form__info">
          For Test Purposes:test@test.test & supersecret
        </p>
      </div>
      <div className="auth-view__image">
        <img src={authViewImage} />
      </div>
    </div>
  );
};

export default Auth;
