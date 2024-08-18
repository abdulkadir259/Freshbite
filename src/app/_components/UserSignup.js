"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const UserSignUp = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMpbile] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    console.log(name, email, mobile, address, password, cpassword, city);

    if (password !== cpassword) {
      alert("invalid password");
      return false;
    }

    let response = await fetch("http://localhost:3000/api/restaurant/user", {
      method: "post",
      body: JSON.stringify({ name, email, mobile, address, city, password }),
    });

    response = await response.json();
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("user", JSON.stringify(result));
      // router.push("/");
      if (props.redirect.order) {
        router.push("/order");
      } else {
        router.push("/");
      }
    } else {
      alert("failed");
    }
  };

  return (
    <>
      <div>
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
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="input-field"
            placeholder="Enter email"
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
          <input
            onChange={(e) => setMpbile(e.target.value)}
            type="text"
            className="input-field"
            placeholder="Enter mobile no"
          />
        </div>
        <div className="input-wrapper">
          <button onClick={() => handleSignUp()} className="button">
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default UserSignUp;
