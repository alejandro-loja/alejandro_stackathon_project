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
    <div className="p-5 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
      <div className="card">
        <div className="card-body">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Hello, {capitalize(auth.username)}
          </h1>
          <h4 className="card-texttext-4xl font-extrabold dark:text-white">
            Role: {capitalize(auth.role)}
          </h4>

          <p className="text-gray-500 dark:text-gray-400">
            Reports to:{" "}
            {auth.manager ? capitalize(auth.manager.username) : "Not Assigned"}
          </p>
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
