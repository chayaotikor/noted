import styled from "styled-components";

export const AuthForm = styled.form`
background-color: #4c132c;
align-items: center;
display: flex;
padding: 1%;
justify-content: space-around;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  flex-flow: column nowrap;
  width: 50vw;
  max-width: 600px;
  border: 2px solid white;
  border-radius: 10px;
  height: 90%;
  max-height: 300px;
  @media only screen and (orientation: Portrait) and (max-width: 600px) {
    width: 95vw
    max-height: 200px;
  }

  @media only screen and (orientation: Landscape) and (max-width: 900px) {
    max-height: 200px;
  }

`;

export const AuthFormHeading = styled.h1`
font-family: "Dancing Script", cursive;
	font-size: 3rem
	color: #FFF;
	text-align: center;
	font-weight: bold;
`;

export const AuthFormInput = styled.input`
  width: 95%;
  font-family: "Montserrat", sans-serif;
  border-radius: 10px;
  border: 2px dashed #4c132c;
  padding: 2.5%;
`;

export const AuthFormActions = styled.div`
  display: flex;
  flew-flow: row nowrap;
  justify-content: space-between;
  width: 95%;
`;