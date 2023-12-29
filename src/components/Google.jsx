import React from "react";
import "./google.css";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../Firebase";
import { useNavigate } from "react-router-dom";

const Google = () => {
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const navigate = useNavigate();

  const signupWithGoogle = async () => {
    let res = await signInWithPopup(auth, googleProvider);
    if (res?.user?.accessToken) {
      navigate("/layout");
    }
  };

  return (
    <div className="center-content">
      <p>Welcome to my Project</p>
      <p>Please login with google to see..!!</p>
      <div className="center-button">
        <button className="login-with-google-btn" onClick={signupWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Google;
