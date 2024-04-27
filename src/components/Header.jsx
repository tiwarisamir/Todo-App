import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/store";

const Header = () => {
  const { isAuthenticated, loading, logout, user } = useContext(Context);

  return (
    <nav className="header">
      <div>
        <h2>Todo App.</h2>
      </div>

      <article>
        {isAuthenticated && <h5>👋 Hello, {user.name}</h5>}
        {isAuthenticated ? (
          <button disabled={loading} onClick={logout} className="btn">
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
