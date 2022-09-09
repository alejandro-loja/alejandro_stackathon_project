import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUser } from "../store/";

class UpdateUserForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      role: "",
      managerId: "",
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    // console.log(this.props.user);
    this.setState(this.props.user);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user.id && this.props.user.id) {
      this.setState(this.props.user);
    }
    if (prevProps.user.id && !this.props.user.id) {
      this.setState({
        username: "",
        role: "",
        managerId: "",
      });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.updateUser({ ...this.state });
  }

  render() {
    const { username, role, managerId } = this.state;
    const { onChange, handleSubmit } = this;
    const { auth } = this.props;
    console.log(this.props);
    return (
      <div className="container">
        <h3>Update User</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
          <label htmlFor="title">Role:</label>
          <input
            type="text"
            name="role"
            value={role}
            onChange={onChange}
            required
          />
          <br />

          <button className="btn btn-primary" type="submit">
            Update User
          </button>
        </form>
      </div>
    );
  }
}
const mapState = (state, { match }) => {
  //   console.log(match);
  let user = state.users.find((user) => user.id === match.params.id * 1) || {};
  //   console.log(user);
  return {
    user,
    auth: state.auth,
  };
};
const mapDispatch = (dispatch) => {
  return {
    updateUser: (user) => {
      dispatch(updateUser(user));
    },
  };
};
export default connect(mapState, mapDispatch)(UpdateUserForm);
