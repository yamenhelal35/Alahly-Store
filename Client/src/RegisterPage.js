import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./App.css";

let token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuYW5WRVRAZ21haWwuY29tIiwiX2lkIjoiNjI5M2E3NDBkMGIzMDdhMDM3MjI5NThjIiwiaWF0IjoxNjUzODQzNzc2LCJleHAiOjE2NTM5MzAxNzZ9.lZGLEI34My9Yhxk_97JbcHBXFF5jOw5qLJ6rdpE0NcM";
const headers = {
  Accept: "Application/json",
  Authorization: token,
};

export default function SignUpPage() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [phone, setPhone] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "phone") {
      setPhone(value);
    }
  };

  const handleSubmit = () => {
    let obj = {
      email: email,
      password: password,
      phone: phone,
    };

    console.log(email, password, phone);
    alert();

    fetch("http://127.0.0.1:8000/customer/signup", {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
  };

  return (
    <div className="text-center m-5-auto">
      <h2> Join us </h2> <h5> Create your personal account </h5>{" "}
      <form action="/home">
        <p>
          <label> Email address </label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            required
            value={email}
            onChange={(e) => handleInputChange(e)}
            placeholder="Email"
          />
        </p>
        <p>
          <label> Password </label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            requiredc
            value={password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
          />
        </p>
        <p>
          <label> Phone </label>
          <br />
          <input
            type="number"
            name="phone"
            id="phone"
            requiredc
            value={phone}
            onChange={(e) => handleInputChange(e)}
            placeholder="Phone"
          />
        </p>
        <p>
          <input type="checkbox" name="checkbox" id="checkbox" required />{" "}
          <span>
            {" "}
            I agree all statements in{" "}
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              terms of service{" "}
            </a>
          </span>{" "}
          .{" "}
        </p>
        <p>
          <button
            id="sub_btn"
            type="submit"
            class="btn"
            onClick={() => handleSubmit()}
          >
            {" "}
            Register{" "}
          </button>{" "}
        </p>{" "}
      </form>{" "}
      <footer>
        <p>
          {" "}
          <Link to="/home"> Back to Homepage </Link>.
        </p>
      </footer>{" "}
    </div>
  );
}
