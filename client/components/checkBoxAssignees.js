import React, { Component } from "react";
import { connect } from "react-redux";
// import { createAssignees } from "../store";

class checkBoxAssignees extends Component {
  constructor() {
    super();
    this.state = {
      assignees: [],
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    this.props.createTask({ ...this.state });
    this.setState({
      assignees: [],
    });
  }

  render() {
    const { handleSubmit, onChange } = this;
    const { assignToList } = this.props;
    return assignToList.map((user) => {
      return (
        <div key={user.id}>
          <input
            onChange={onChange}
            type="checkbox"
            name="asignees"
            value={user.id}
          />
          <label htmlFor="asignees">{user.username}</label>
        </div>
      );
    });
  }
}

const mapState = (state) => {
  const role = state.auth.role;
  // const assignToList = state.users || [];

  const assignToList = state.users.filter((user) => {
    if (role === "manager") {
      return user.role === "technician";
    } else if (role === "supervisor") {
      return user.role === "manager";
    }
  });
  console.log(assignToList);
  return {
    assignToList,
  };
};

const mapDispatch = (dispatch) => {
  return {
    createTask: (task) => {
      dispatch(createTask(task));
    },
  };
};
export default connect(mapState, mapDispatch)(checkBoxAssignees);
