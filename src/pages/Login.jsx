import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { server } from "../main";
import toast from "react-hot-toast";
import axios from "axios";
import { Context } from "../store/store";

const Login = () => {
  const { isAuthenticated, loading, login } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="login">
      <section>
        <form onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
          <button disabled={loading} type="submit">
            Login
          </button>
          <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
