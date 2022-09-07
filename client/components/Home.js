import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = ({ auth }) => {
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div className="container">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h1 className="card-title">Hello, {capitalize(auth.username)}</h1>
          <h4 className="card-text">Role: {capitalize(auth.role)}</h4>

          <h6 className="card-subtitle mb-2 text-muted">
            Reports to:{" "}
            {auth.manager ? capitalize(auth.manager.username) : "Not Assigned"}
          </h6>
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapState)(Home);
