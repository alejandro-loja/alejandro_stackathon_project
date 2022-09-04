import axios from "axios";

const users = (state = [], action) => {
  if (action.type === "SET_USERS") {
    return action.users;
  }
  //   else if (action.type === "CREATE_USER") {
  //     return [...state, action.user];
  //   } else if (action.type === "UPDATE_USER") {
  //     return state.map((user) =>
  //     user.id === action.updatedUser.id ? action.updatedUser : user
  //     );
  //   } else if (action.type === "DELETE_USER") {
  //     return state.filter((user) => user.id !== action.user.id);
  //   }
  return state;
};

// //get all users
export const fetchUsers = () => {
  return async (dispatch) => {
    const users = (
      await axios.get("/api/users", {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      })
    ).data;
    dispatch({ type: "SET_USERS", users });
  };
};
//create user
export const createUser = (user) => {
  return async (dispatch) => {
    user = (
      await axios.post("/api/users/", user, {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      })
    ).data;
    dispatch({ type: "CREATE_TASK", user });
  };
};

export default users;
