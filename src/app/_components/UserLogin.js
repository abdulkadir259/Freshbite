import { useRouter } from "next/navigation";
import { useState } from "react";

const UserLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const router = useRouter();

  const loginUser = async () => {
    console.log(email, password);
    let response = await fetch(
      "http://localhost:3000/api/restaurant/user/login",
      {
        method: "post",
        body: JSON.stringify({ email, password }),
      }
    );

    response = await response.json();
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("user", JSON.stringify(result));
      if (props.redirect.order) {
        router.push("/order");
      } else {
        router.push("/");
      }
    } else {
      alert("login failed");
    }
  };

  return (
    <>
      <div className="input-wrapper">
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="enter email"
          className="input-field"
        />
      </div>
      <div className="input-wrapper">
        <input
          onChange={(e) => setpassword(e.target.value)}
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
    </>
  );
};

export default UserLogin;
