import React, { Component } from "react";
import { connect } from "react-redux";
import { createUser } from "../store/";
import auth from "../store/auth";

class CreateUserForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      role: "",
      // managerId: "",
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
    this.props.createUser({ ...this.state });
    this.setState({
      username: "",
      password: "",
      role: "",
      managerId: "",
    });
  }

  render() {
    const { username, password, role, managerId } = this.state;
    const { handleSubmit, onChange } = this;
    // const { assignToList } = this.props;
    // const { campuses } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <h2>Add An Employee </h2>
        <input
          placeholder="Username (Required)"
          value={username}
          name="username"
          onChange={onChange}
        />
        <input
          placeholder="Password (Required)"
          name="password"
          value={password}
          onChange={onChange}
        />

        <br />
        <select name="role" defaultValue="" onChange={onChange}>
          <option disabled={true} value="">
            -- Position/Role --
          </option>
          <option value="Manager">Manager</option>
          <option value="Technician">Technician</option>
          {/* <option value="high">High</option> */}
        </select>
        <br />
        <button disabled={!username || !password || !role}>Create</button>
      </form>
    );
  }
}
const mapState = (state) => {
  const role = state.auth.role;
  // const assignToList = state.users || [];

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
  };
};
const mapDispatch = (dispatch) => {
  return {
    createUser: (task) => {
      dispatch(createUser(task));
    },
  };
};
export default connect(mapState, mapDispatch)(CreateUserForm);
