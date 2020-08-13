import styled, { createGlobalStyle, keyframes } from "styled-components";
import reset from "styled-reset";
import settingsIcon from "./settings-icon.png";
import sortIcon from "./sort-icon.png";
import { Link } from "react-router-dom";

// font-family: 'Dancing Script', cursive;
// font-family: 'Montserrat', sans-serif;

//Global Styles
export const GlobalStyle = createGlobalStyle`
${reset}
* {
	box-sizing: border-box;
}

html, body{
  	margin: 0;
	padding: 0;
}
html{
	font-size: 62.5%;
}
body {
	background: #ffaf9c;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
    scrollbar-color: #4c132c #ffeade; 
    scrollbar-width: thin;
	::-webkit-scrollbar {
		width: 7.5px;
	}
	::-webkit-scrollbar-track {
		background: #ffeade;
	}
	::-webkit-scrollbar-thumb {
		background: #4c132c;
		border-right: 1px solid #ffeade;
	}
}
`;

//Animation
export const pulse = keyframes`
0% { transform: scale(1)
}

50% { transform: scale(1.05)}

100% { transform: scale(1)}
`;

export const spin = keyframes`
	0% {
	  transform: rotate(0deg);
	}
	100% {
	  transform: rotate(360deg);
	}
  `;

export const LoadingSpan = styled.span`
  position: absolute;
  bottom: 25%;
  left: calc(50% - 4em);
  width: 6em;
  height: 6em;
  border: 1.1em solid rgba(0, 0, 0, 0.2);
  border-left: 1.1em solid #4c132c;
  border-radius: 50%;
  animation: ${spin} 1.1s infinite linear;
  transition: opacity 0.3s;
`;

//Main Container
export const AppContainer = styled.main`
  background: #ffaf9c;
  height: 100vh;
  padding: 2.5%;
  position: relative;
  max-width: 600px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  align-items: center;
  z-index: 0;
`;

//Top Bar Components
export const TopBarContainer = styled.div`
  border-bottom: 2px solid #4c132c;
  position: fixed;
  top: 0;
  z-index: 100;
  padding: 1%;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: white;
  @media only screen and (orientation: Portrait) and (max-width: 600px) {
    max-height: 100px;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 1%;
  }
`;

export const LogoutButton = styled(Link)`
  font-size: 1rem;
  padding: 1rem;
  width: 75px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  background: #4c132c;
  border-radius: 10px;
  font-family: "Montserrat", sans-serif;
  :hover {
    animation: ${pulse} 1s infinite;
    background: #fff;
    color: #4c132c;
    border: 2px dashed #4c132c;
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 37px -3px rgba(0, 0, 0, 0.51);
    -moz-box-shadow: 0px 0px 37px -3px rgba(0, 0, 0, 0.51);
    box-shadow: 0px 0px 37px -3px rgba(0, 0, 0, 0.51);
  }
  :focus {
    outline: none;
  }
  @media only screen and (orientation: Portrait) and (max-width: 600px) {
    order: 0;
  }
`;

export const SettingsButton = styled(Link)`
  height: 2.4rem;
  width: 75px;
  background: none;
  background-image: url(${settingsIcon});
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  @media only screen and (orientation: Portrait) and (max-width: 600px) {
    order: 0;
  }
`;

export const AppHeader = styled(Link)`
  font-family: "Dancing Script", cursive;
  text-decoration: none;
  font-size: 4rem;
  color: #4c132c;
  text-align: center;
  font-weight: bold;
  display: ${(props) =>
    props.mode === "single"
      ? "none"
      : props.mode === "create"
      ? "none"
      : props.mode === "edit"
      ? "none"
      : "block"};
  @media only screen and (orientation: Portrait) and (max-width: 600px) {
    font-size: 2rem;
    order: 1;
    margin-bottom: 1rem;
    width: 100%;
    text-align: center;
  }
`;

//Search Elements
export const SearchInput = styled.input`
  width: 20%;
  padding: 1%;
  font-family: "Montserrat", sans-serif;
  background: #ffeade;
  color: #4c132c;
  border-radius: 10px;
  border: 2px dashed #4c132c;
  text-align: center;
  :focus {
    outline: none;
  }
  display: ${(props) =>
    props.mode === "single"
      ? "none"
      : props.mode === "create"
      ? "none"
      : props.mode === "edit"
      ? "none"
      : "block"};
  @media only screen and (orientation: Portrait) and (max-width: 600px) {
    width: 45%;
    order: 2;
  }
`;

//Sort Elements
export const SortContainer = styled.select`
  border: 1px solid blue;
  font-family: "Montserrat", sans-serif;
  background: #ffeade;
  width: 20%;
  padding: 1%;
  color: #4c132c;
  border-radius: 10px;
  border: 2px dashed #4c132c;
  text-align: center;
  display: ${(props) =>
    props.mode === "single"
      ? "none"
      : props.mode === "create"
      ? "none"
      : props.mode === "edit"
      ? "none"
      : "block"};

  :focus {
    outline: none;
  }
  ::-ms-expand {
    display: none;
  }
  -ms-word-break: normal;
  word-break: normal;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: url(${sortIcon});
  background-repeat: no-repeat;
  background-position: right 0.7em top 50%;
  background-size: 1.6rem auto;
  @media only screen and (orientation: Portrait) and (max-width: 600px) {
    width: 45%;
    order: 2;
  }
`;

export const SortOption = styled.option`
  font-family: "Montserrat", sans-serif;
  text-align: center;
  font-size: 1.2rem;
  color: #4c132c;
  background-color: #ffeade;
`;

//Text Elements
export const H1 = styled.h1`
  font-family: "Dancing Script", cursive;
  font-size: ${(props) => (props.component === "delete" ? "2.5rem" : "3rem")};
  color: ${(props) => (props.component === "delete" ? "#FFFFFF" : "#4C132C")};
  text-align: center;
  justify-self: flex-start;
  font-weight: bold;
`;
export const H2 = styled.h2`
  font-family: "Montserrat", sans-serif;
  text-align: center;
  font-size: ${(props) => (props.component === "single" ? "2.4rem" : "1.2rem")};
  padding: 0 5%;
  color: ${(props) => (props.sort ? "#FFFFFF" : null)};
  margin-bottom: 2.5%;
  cursor: ${(props) => (props.sort ? "pointer" : null)};
  :hover {
    color: ${(props) => (props.sort ? "#4C132C" : null)};
  }
`;

export const P = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: ${(props) => (props.component === "single" ? "1.2rem" : "1.4rem")};
  background: ${(props) => (props.component === "single" ? "#FFFFFF" : null)};
  border: ${(props) =>
    props.component === "single" ? "2px dashed #4C132C" : null};
  padding: ${(props) => (props.component === "single" ? "5%" : null)};
  width: 100%;
  height: 60vh;
  overflow: hidden auto;
  text-align: justify;
`;

//Buttons

export const ButtonContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  margin-top: 5%;
`;

export const Button = styled.button`
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
  font-size: 1.6rem;
  color: ${(props) => (props.auth ? "#4c132c" : "#FFF")};
  padding: 2.5%;
  margin: ${(props) => (props.auth ? "2.5% 0 0" : "2.5% 1%")};
  border: none;
  border-radius: 10px;
  width: ${props => props.auth ? '47.5%': '200px'};
  background: ${(props) => (props.auth ? "#FFF" : "#4c132c")};
  font-weight: bold;
  text-align: center;
  :hover {
    animation: ${pulse} 1s infinite;
    background: white;
    color: #4c132c;
    border: 2px dashed #4c132c;
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 37px -3px rgba(0, 0, 0, 0.51);
    -moz-box-shadow: 0px 0px 37px -3px rgba(0, 0, 0, 0.51);
    box-shadow: 0px 0px 37px -3px rgba(0, 0, 0, 0.51);
  }
  :focus {
    outline: none;
  }
`;
