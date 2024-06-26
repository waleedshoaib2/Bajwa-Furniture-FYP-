import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/action/apiUserAction";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Meta from "../../components/Meta";
import DisplayPending from "../../components/DisplayPending";
import Alert from "@mui/material/Alert";
import CustomDivider from "../../components/CustomDivider";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const navigate = useNavigate();

  // Redux
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const { pending, error, errorMessage, userInfo } = userLogin;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // get query param
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect")
    ? searchParams.get("redirect")
    : "";

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (userInfo) {
      console.log(userInfo);
      if (userInfo.isAdmin) {
        navigate("/testing");
      } else {
        navigate(`/${redirect}`);
        toast.success("Login successful!");
      }
    }

    if (error) {
      toast.error(errorMessage);
    }
  }, [navigate, userInfo, error, errorMessage, redirect]);

  function handleLogin(e) {
    e.preventDefault();
    dispatch(login(email, password));
  }

  return (
    <div className="login">
      <div className="auth">
        <Meta title="Login" />
        <DisplayPending pending={pending} />
        <form className="auth__container" onSubmit={handleLogin}>
          {error ? <Alert severity="error">{errorMessage}</Alert> : null}
          <div className="auth__title">Welcome back!</div>
          <div className="auth__input__container">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth__input__container">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="auth-button" type="submit">
            Log In
          </button>
          <CustomDivider text={"OR"} />
          <h1 className="auth__navigation">
            Need an account?{" "}
            <span onClick={(e) => navigate(`/register?redirect=${redirect}`)}>
              Register
            </span>
          </h1>
        </form>
        <ToastContainer /> {/* Toast container */}
      </div>
    </div>
  );
}
