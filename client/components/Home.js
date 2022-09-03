import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = ({ auth }) => {
  return (
    <div>
      <h3>Welcome, {auth.username}</h3>
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
