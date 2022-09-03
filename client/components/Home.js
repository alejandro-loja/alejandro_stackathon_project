import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = ({ auth }) => {
  return (
    <div>
      <h3>Hello, {auth.username}</h3>

      <h3>Reports to: {auth.manager.username}</h3>
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
