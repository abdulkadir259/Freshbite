"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import DeliveryHeader from "../_components/DeliveryHeader";
import { useEffect } from "react";

const Page = () => {
  const [loginmobile, setloginMobile] = useState("");
  const [loginpassword, setloginpassword] = useState("");

  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMpbile] = useState("");
  const router = useRouter();

  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem("delivery"));
    if (delivery) {
      router.push("/deliverydashboard");
    }
  }, []);

  const handleSignUp = async () => {
    console.log(name, mobile, address, password, cpassword, city);

    if (password !== cpassword) {
      alert("invalid password");
      return false;
    }

    let response = await fetch(
      "http://localhost:3000/api/restaurant/deliveryPartner/signup",
      {
        method: "post",
        body: JSON.stringify({ name, mobile, address, city, password }),
      }
    );

    response = await response.json();
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("delivery", JSON.stringify(result));
      router.push("/deliverydashboard");
    } else {
      alert("failed");
    }
  };

  const loginUser = async () => {
    console.log(loginmobile, loginpassword);
    let response = await fetch(
      "http://localhost:3000/api/restaurant/deliveryPartner/login",
      {
        method: "post",
        body: JSON.stringify({ mobile: loginmobile, password: loginpassword }),
      }
    );

    response = await response.json();
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("delivery", JSON.stringify(result));
      router.push("/deliverydashboard");
    } else {
      alert("login failed");
    }
  };

  return (
    <>
      <div>
        <DeliveryHeader />
        <h1>Delivery Partner</h1>
        <div className="auth-container">
          <div className="login-wrapper">
            <h3>Login</h3>
            <div className="input-wrapper">
              <input
                onChange={(e) => setloginMobile(e.target.value)}
                type="text"
                placeholder="enter mobile"
                className="input-field"
              />
            </div>
            <div className="input-wrapper">
              <input
                onChange={(e) => setloginpassword(e.target.value)}
                type="password"
                placeholder="enter password"
                className="input-field"
              />
            </div>
            <div className="input-wrapper">
              <button className="button" onClick={loginUser}>
                Login
              </button>
            </div>
          </div>
          <div className="signup-wrapper">
            <h3>SignUp</h3>
            <div className="input-wrapper">
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="input-field"
                placeholder="Enter name"
              />
            </div>
            <div className="input-wrapper">
              <input
                onChange={(e) => setMpbile(e.target.value)}
                type="text"
                className="input-field"
                placeholder="Enter mobile no"
              />
            </div>
            <div className="input-wrapper">
              <input
                onChange={(e) => setpassword(e.target.value)}
                type="password"
                className="input-field"
                placeholder="Enter password"
              />
            </div>
            <div className="input-wrapper">
              <input
                onChange={(e) => setcpassword(e.target.value)}
                type="password"
                className="input-field"
                placeholder=" confirm password"
              />
            </div>
            <div className="input-wrapper">
              <input
                onChange={(e) => setCity(e.target.value)}
                type="text"
                className="input-field"
                placeholder="Enter city"
              />
            </div>
            <div className="input-wrapper">
              <input
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                className="input-field"
                placeholder="Enter address"
              />
            </div>

            <div className="input-wrapper">
              <button className="button" onClick={handleSignUp}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
