"use client";

import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import UserLogin from "../_components/UserLogin";
import UserSignUp from "../_components/UserSignup";

const UserAuth = (props) => {
  console.log(props.searchParams.order);

  const [login, setLogin] = useState(true);
  return (
    <div>
      <CustomerHeader />
      <div className="container">
        <h1>{login ? "User Login" : "User SignUp"}</h1>
        {login ? (
          <UserLogin redirect={props.searchParams} />
        ) : (
          <UserSignUp redirect={props.searchParams} />
        )}
        <button className="button-link" onClick={() => setLogin(!login)}>
          {login
            ? "Do not have account? SignUp"
            : "Already have account? Login"}
        </button>
      </div>
      <RestaurantFooter />
    </div>
  );
};

export default UserAuth;
