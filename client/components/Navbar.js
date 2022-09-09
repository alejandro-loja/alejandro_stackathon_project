import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, auth }) => {
  const color = () => {
    if (auth.role === "Technician") {
      return "bg-success";
    } else if (auth.role === "Manager") {
      return "bg-primary";
    } else if (auth.role === "Supervisor") {
      return "bg-dark";
    } else {
      return "bg-secondary";
    }
  };
  return (
    <nav className={`navbar navbar-expand-lg ${color()} mb-4 p-4 `}>
      <div className="container-fluid">
        {isLoggedIn ? (
          <div>
            <span className="navbar-brand text-white fw-bold">
              Hi, {auth.username}
            </span>
            {/* The navbar will show these links after you log in */}
            <Link to="/home" className="link-light">
              Home
            </Link>
            {auth.role === "Technician" && (
              <Link className="link-light" to="/tasks">
                Assigned Tasks
              </Link>
            )}
            {auth.role !== "Technician" && (
              <Link className="link-light" to="/tasks">
                Tasks
              </Link>
            )}
            {auth.role === "Supervisor" && (
              <Link className="link-light" to="/users">
                Employees
              </Link>
            )}
            <a href="#" className="link-light" onClick={handleClick}>
              Logout
            </a>
            <span className="navbar-text text-end">Role: {auth.role}</span>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link className="link-light" to="/login">
              Login
            </Link>
            {/* <Link to="/signup">Sign Up</Link> */}
          </div>
        )}
      </div>
    </nav>
  );
};

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
