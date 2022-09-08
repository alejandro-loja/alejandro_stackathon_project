import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CreateUserForm from "../components/CreateUserForm";
import { deleteUser } from "../store";

/**
 * COMPONENT
 */
const Users = ({ users, auth, deleteUser }) => {
  return (
    <div className="container text-center ">
      <div className="row">
        <div className="col text-start list-of-things ">
          {users ? (
            users.map((user) => (
              <div className="row border p-2" key={user.id}>
                <h4 className="col-4">
                  {user.username}
                  {/* <Link to={`/tasks/${user.id}`}>{user.username} </Link> */}
                </h4>
                <h6 className="col-6">Role: {user.role}</h6>
                <button
                  className="col-2 btn btn-danger"
                  onClick={() => deleteUser(user)}
                >
                  X
                </button>
              </div>
            ))
          ) : (
            <div>
              <h1>No Employees Yet</h1>
            </div>
          )}
        </div>
        <div className="col">
          <CreateUserForm />
        </div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  const filteredUsers = state.users?.filter((user) => {
    if (user.role === "Supervisor") {
      return false;
    } else {
      return true;
    }
  });
  return {
    users: filteredUsers,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    deleteUser: (user) => {
      dispatch(deleteUser(user));
    },
  };
};

export default connect(mapState, mapDispatch)(Users);
