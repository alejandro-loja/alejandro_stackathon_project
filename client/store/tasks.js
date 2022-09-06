import axios from "axios";

const tasks = (state = [], action) => {
  if (action.type === "SET_TASKS") {
    return action.tasks;
  } else if (action.type === "CREATE_TASK") {
    return [...state, action.task];
  } else if (action.type === "UPDATE_TASK") {
    return state.map((product) =>
      product.id === action.updatedTask.id ? action.updatedTask : product
    );
  } else if (action.type === "DELETE_TASK") {
    return state.filter((task) => task.id !== action.task.id);
  }
  return state;
};

// //get all tasks
export const fetchTasks = () => {
  return async (dispatch) => {
    const tasks = (
      await axios.get("/api/tasks", {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      })
    ).data;
    dispatch({ type: "SET_TASKS", tasks });
  };
};
//create user
export const createTask = (task) => {
  return async (dispatch) => {
    task = (
      await axios.post("/api/tasks/", task, {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      })
    ).data;
    console.log(task.id);
    dispatch({ type: "CREATE_TASK", task });
  };
};
// //update product
// export const updateProduct = (product, id) => {
//     return async(dispatch) => {
//         const updatedProduct = (await axios.put(`/api/products/${id}`, {
//             name: product.name,
//             description: product.description,
//             limit: product.limit,
//             ml: product.ml,
//             price: product.price,
//             imgUrl: product.imgUrl
//         }, {
//             headers: {
//                 authorization: window.localStorage.getItem('token')
//             }
//         })).data;
//         dispatch({type: 'UPDATE_PRODUCT', updatedProduct});
//     }
// };
//delete task
export const deleteTask = (task) => {
  return async (dispatch) => {
    await axios.delete(`/api/tasks/${task.id}`, {
      headers: {
        authorization: window.localStorage.getItem("token"),
      },
    });
    dispatch({ type: "DELETE_TASK", task });
  };
};

export default tasks;
