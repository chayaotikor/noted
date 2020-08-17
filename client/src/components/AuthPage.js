import React, { Component } from "react";
import {
  Button,
  GlobalStyle,
  AppContainer,
  AppHeader,
  TopBarContainer,
} from "../style";
import {
  AuthForm,
  AuthFormInput,
  AuthFormHeading,
  AuthFormActions,
} from "../style/auth-styles";
import { Ticker } from "./Ticker";

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "login",
      credentials: {
        email: "",
        password: "",
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

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.mode === "login") {
      this.props.login(this.state.credentials);
    }
    if (this.state.mode === "register") {
      this.props.register(this.state.credentials);
    }

    setTimeout(() => {
      if (
        localStorage.getItem("TOKEN") !== null &&
        localStorage.getItem("ID") !== null
      ) {
        this.props.history.push("/notes");
      } else {
        this.props.history.push("/");
      }
    }, 3000);
  };

  toggleAuthMode = () => {
    if (this.state.mode === "login") {
      this.setState({
        ...this.state,
        mode: "register",
      });
    } else {
      this.setState({
        ...this.state,
        mode: "login",
      });
    }
  };

  render() {
    return (
      <>
        <GlobalStyle />
        <AppContainer mode="auth">
          <TopBarContainer>
            <AppHeader mode="auth" style={{ width: "100%" }} to="/">
              Noted
            </AppHeader>
          </TopBarContainer>
          <Ticker ticker={this.props.ticker} error={this.props.error} message={this.props.message}/>
          <AuthForm
            onSubmit={(e) => {
              this.handleSubmit(e);
            }}
          >
            <AuthFormHeading>
              {this.state.mode === "register" ? "Sign Up" : "Sign In"}
            </AuthFormHeading>
            <AuthFormInput
              type="email"
              name="email"
              placeholder="email"
              onChange={this.handleChange}
            ></AuthFormInput>
            <AuthFormInput
              type="password"
              name="password"
              placeholder="password"
              onChange={this.handleChange}
            ></AuthFormInput>
            <AuthFormActions>
              <Button type="submit" auth>
                Submit
              </Button>
              <Button
                auth
                onClick={(e) => {
                  e.preventDefault();
                  this.toggleAuthMode();
                }}
              >
                {this.state.mode === "register" ? "Sign In" : "Sign Up"}
              </Button>
            </AuthFormActions>
          </AuthForm>
        </AppContainer>
      </>
    );
  }
}

export default AuthPage;
