import React, { Component } from "react";
import {
  Button
} from "../style";
import {
  AuthForm,
  AuthFormInput,
  AuthFormHeading,
  AuthFormActions
} from "../style/auth-styles";

class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        oldPassword: "",
        newPassword: "",
      },
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.props.changePassword(this.state.credentials)
    setTimeout(()=>{
    this.props.history.push('/notes')
    }, 1000)
  };


  render() {
    return (
      <AuthForm onSubmit={e => { this.handleSubmit(e)}}>
        <AuthFormHeading>
          User Settings
        </AuthFormHeading>
        <AuthFormInput
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          onChange={this.handleChange}
        ></AuthFormInput>
        <AuthFormInput
          type="password"
          name="newPassword"
          placeholder="New Password"
          onChange={this.handleChange}
        ></AuthFormInput>
        <AuthFormActions style={{justifyContent: 'center'}}>
          <Button
          type='submit'
            auth
          >
            Update
          </Button>
        </AuthFormActions>
      </AuthForm>
    );
  }
}

export default SettingsPage;
