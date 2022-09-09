import React, { Component } from "react";
import { connect } from "react-redux";
import { createTask } from "../store/";
import auth from "../store/auth";

class CreateTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      notes: "",
      priority: "",
      expectedDate: "",
      potential: 0,
      userId: "",
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.disableCreateButton = this.disableCreateButton.bind(this);
  }

  onChange(e) {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);

    if (this.props.auth.role === "Supervisor") {
      this.props.createTask({ ...this.state });
    } else {
      this.props.createTask({ ...this.state, userId: this.props.auth.id });
    }

    this.setState({
      title: "",
      description: "",
      priority: "",
      notes: "",
      expectedDate: "",
      userId: "",
      potential: "",
    });
  }

  disableCreateButton() {
    const {
      title,
      description,
      priority,
      notes,
      expectedDate,
      userId,
      potential,
    } = this.state;
    if (this.props.auth?.role === "Supervisor") {
      return (
        <button
          className="btn btn-primary"
          disabled={
            !title ||
            !description ||
            !priority ||
            !expectedDate ||
            !userId ||
            !potential
          }
        >
          Create
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-primary"
          disabled={
            !title || !description || !priority || !expectedDate || !potential
          }
        >
          Create
        </button>
      );
    }
  }

  render() {
    const {
      title,
      description,
      priority,
      notes,
      expectedDate,
      userId,
      potential,
    } = this.state;
    const { handleSubmit, onChange, disableCreateButton } = this;
    const { assignToList, users } = this.props;
    // const { campuses } = this.props;
    return (
      <form onSubmit={handleSubmit} className="text-center">
        <h2 className="fw-bold">Create Task</h2>
        <div className="mb-2">
          <input
            placeholder="Title (Required)"
            value={title}
            name="title"
            onChange={onChange}
          />
        </div>
        <div className="mb-2">
          <textarea
            placeholder="Description (Required)"
            name="description"
            value={description}
            onChange={onChange}
          />
        </div>
        <div className="mb-2">
          <textarea
            placeholder="Notes"
            name="notes"
            value={notes}
            onChange={onChange}
          />
        </div>
        <div className="mb-2">
          <select name="priority" defaultValue="" onChange={onChange}>
            <option disabled={true} value="">
              -- Priority Level --
            </option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <br />
        <label htmlFor="expected date">Expected Date:</label>
        <input
          type="date"
          id="expectedDate"
          value={expectedDate}
          name="expectedDate"
          onChange={onChange}
        ></input>
        <br />
        <div className="mb-2">
          <label htmlFor="potential">Potential Earning:</label>
          <input
            type="number"
            min="0"
            name="potential"
            value={potential}
            onChange={onChange}
          />
        </div>

        {auth.role === "Supervisor" && (
          <div className="mb-2">
            <select name="userId" defaultValue="" onChange={onChange}>
              <option disabled={true} value="">
                -- Priority Level --
              </option>
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
        )}
        <br />
        {disableCreateButton()}
      </form>
    );
  }
}
const mapState = (state) => {
  const role = state.auth.role;
  // const assignToList = state.users || [];
  const filteredUsers = state.users?.filter((user) => {
    if (user.role === "Manager") {
      return true;
    } else {
      return false;
    }
  });

  const assignToList = state.users.filter((user) => {
    if (role === "Manager") {
      return user.role === "Technician";
    } else if (role === "Supervisor") {
      return user.role === "Manager";
    }
  });
  // console.log(assignToList);
  return {
    assignToList,
    auth: state.auth,
    users: filteredUsers,
  };
};
const mapDispatch = (dispatch) => {
  return {
    createTask: (task) => {
      dispatch(createTask(task));
    },
  };
};
export default connect(mapState, mapDispatch)(CreateTaskForm);
