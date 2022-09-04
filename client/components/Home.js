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
    <div>
      <h1>Hello, {capitalize(auth.username)}</h1>
      <h2>Role: {capitalize(auth.role)}</h2>

      <h3>
        Reports to:{" "}
        {auth.manager ? capitalize(auth.manager.username) : "Not Assigned"}
      </h3>
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
