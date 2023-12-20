import React, { useEffect, useRef, useState } from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { TiArrowRightThick, TiArrowDownThick } from "react-icons/ti";

const Navigation = () => {
  const [show, setShow] = useState(false);
  // const [button, setButton] = useState(true);
  const myref = useRef();

  useEffect(() => {
    const myFun = (e) => {
      if (!myref?.current?.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("click", myFun);
    return () => {
      document.removeEventListener("click", myFun);
    };
  }, []);

  return (
    <>
      <div className="sidenav">
        <h1>Demo</h1>

        <h4 id="user" ref={myref} onClick={() => setShow(!show)}>
          User
          <span>{show ? <TiArrowDownThick /> : <TiArrowRightThick />}</span>
        </h4>

        {show ? (
          <div id="dd">
            <Link to="/">User List</Link>
            <Link to="createuser">Create user</Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Navigation;
