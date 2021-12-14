import Main from "./components/main/main";
import React, { useState, useEffect } from "react";
import Signup from "./components/authentication/Signup";
import Signin from "./components/authentication/Signin";
import { useDispatch, useSelector } from "react-redux";
import { signinAction, signupAction } from "./store/auth-actions";
import { sendProfileData, fetchProfileData } from "./store/profile-actions";
import { authActions } from "./store/auth";

const App = () => {
  const dispatch = useDispatch();
  const [signup, setSignup] = useState(false);
  const [signin, setSignin] = useState(false);
  const isAuth = useSelector((state) => state.auth);
  const aboutData = useSelector((state) => state.profile);

  var isStart = false;
  useEffect(() => {
    if (localStorage.getItem("idToken") !== null) {
      dispatch(
        authActions.login({
          idToken: localStorage.getItem("idToken"),
          localId: localStorage.getItem("localId"),
        })
      );
    }
  }, []);
  

  const signinHandler = () => {
    setSignup(false);
    setSignin(true);
    // console.log("login handler");
  };
  const signupHandler = () => {
    setSignup(true);
    setSignin(false);
  };
  const signupHandle = (email, password, firstname, lastname) => {
    setSignup(false);
    setSignin(false);
    console.log("Signup function", email, password);
    dispatch(signupAction(email, password, firstname, lastname));
  };
  const loginHandler = (email, password) => {
    setSignup(false);
    setSignin(false);
    dispatch(signinAction(email, password));
    console.log("login handler", email, password);
  };
  const closeHandler = () => {
    setSignup(false);
    setSignin(false);
  };

  return (
    <React.Fragment>
      {/* Routing should be implemented here only */}
      {signup && (
        <Signup
          signinHandler={signinHandler}
          loginHandler={signupHandle}
          closeHandler={closeHandler}
        />
      )}
      {signin && (
        <Signin
          signupHandler={signupHandler}
          loginHandler={loginHandler}
          closeHandler={closeHandler}
        />
      )}
      <Main signinHandler={signinHandler} />
    </React.Fragment>
  );
};

export default App;
