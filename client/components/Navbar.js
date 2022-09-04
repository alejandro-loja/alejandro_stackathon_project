import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, auth }) => (
  // <h1>Useful App</h1>
  <nav className="navbar navbar-expand-lg bg-light mb-4">
    <div className="container-fluid">
      {isLoggedIn ? (
        <div>
          <a className="navbar-brand" href="#">
            Hi, {auth.username}
          </a>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/tasks">Tasks</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <span className="navbar-text">Role: {auth.role}</span>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </div>
  </nav>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
