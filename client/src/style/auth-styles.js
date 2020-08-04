import styled from "styled-components";

export const AuthForm = styled.form`
  justify-content: space-around;
  background-color: #4c132c;
  align-items: center;
  display: flex;
  padding: 2.5%;
  flex-flow: column nowrap;
  width: 50vw;
  max-width: 600px;
  border: 2px solid white;
  border-radius: 10px;
  height: 100%;
  max-height: 250px;
`;

export const AuthFormHeading = styled.h1`
font-family: "Dancing Script", cursive;
	font-size: 3rem
	color: #FFF;
	text-align: center;
	font-weight: bold;
`;

export const AuthFormInput = styled.input`
  width: 100%;
  font-family: "Montserrat", sans-serif;
  border-radius: 10px;
  border: 2px dashed #4c132c;
  padding: 2.5%;
`;

export const AuthFormActions = styled.div`
  display: flex;
  flew-flow: row nowrap;
  justify-content: space-around;
  width: 100%;
`;