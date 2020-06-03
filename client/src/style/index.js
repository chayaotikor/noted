import styled, { createGlobalStyle, keyframes } from "styled-components";
import { CSVLink } from "react-csv";
import reset from "styled-reset";

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
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	background: #FFEADE;
	@import url('https://fonts.googleapis.com/css?family=Charm|Dancing+Script:400');
}
`;

//Animation
export const pulse = keyframes`
0% { transform: scale(1)
}

50% { transform: scale(1.05)}

100% { transform: scale(1)}
`;

//Main Containers
export const AppContainer = styled.main`
	background: #ffaf9c;
	padding: 5%;
	margin: 2.5%;
	width: 600px;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	z-index:0;
	-webkit-box-shadow: 0px 0px 45px -11px rgba(0, 0, 0, 0.38);
	-moz-box-shadow: 0px 0px 45px -11px rgba(0, 0, 0, 0.38);
	box-shadow: 0px 0px 45px -11px rgba(0, 0, 0, 0.38);
`;

export const ModalDiv = styled.div`
	z-index: 10;
	opacity: 1;
	background: #4c132c;
	border-radius: 10px;
	width: 100%;
	border: 2px dashed #fff;
	display: flex;
	margin: 2.5% 10%;
	padding: 5% 0;
	justify-content: space-around;
	align-items: center;
	flex-flow: column wrap;
`;

export const NoteListSection = styled.section`
	width: 100%;
	display: flex;
	margin: 2.5% 10%;
	padding: 5% 0;
	justify-content: space-around;
	align-items: center;
	flex-flow: row wrap;
`;

export const Section = styled.section`
	width: 100px;
	height: 125px;
	overflow: hidden;
	display: flex;
	background: #4c132c;
	flex-flow: column nowrap;
	align-items: center;
	position: relative;
	justify-content: center;
	padding: 5%;
	border-radius: 10%;
	margin: 2.5% 0;
	text-align: center;
	border: 2px dashed #fff;
	color: #fff;
	:hover {
		animation: ${pulse} 1s infinite;
		background: white;
		color: #4c132c;
		border: 2px dashed #4c132c;
		border-radius: 10%;
		cursor: pointer;
	}
`;

//Text Elements

export const H1 = styled.h1`
	font-family: "Dancing Script", cursive;
	font-size: 3rem;
	color: ${(props) => (props.component === "delete" ? "#FFFFFF" : "#4C132C")};
	text-align: center;
	justify-self: flex-start;
	font-weight: bold;
`;
export const H2 = styled.h2`
	font-family: "Charm", cursive;
	text-align: center;
	font-size: ${(props) => (props.component === "single" ? "2.4rem" : "1.6rem")};
	padding: 0 5%;
	color: ${(props) => (props.sort ? "#FFFFFF" : null)};
	margin-bottom: 2.5%;
	cursor: ${(props) => (props.sort ? "pointer" : null)};
	:hover {
		color: ${(props) => (props.sort ? "#4C132C" : null)};
	}
`;

export const P = styled.p`
	font-family: "Charm", cursive;
	font-size: ${(props) => (props.component === "single" ? "1.2rem" : "1.4rem")};
	background: ${(props) => (props.component === "single" ? "#FFFFFF" : null)};
	border: ${(props) =>
		props.component === "single" ? "2px dashed #4C132C" : null};
	padding: ${(props) => (props.component === "single" ? "5%" : null)};
	width: 300px;
	height: 50vh;
	overflow: hidden auto;
	text-align: justify;
	::-webkit-scrollbar {
		width: 10px;
	}
	::-webkit-scrollbar-track {
		background: #c3d2d5;
	}
	::-webkit-scrollbar-thumb {
		background: #4c132c;
	}
`;

//Search Elements
export const SearchContainer = styled.form`
	justify-content: space-between;
	align-items: center;
	display: flex;
	flex-flow: column nowrap;
	width: 100%;
`;

export const SearchInput = styled.input`
	width: 100%;
	padding: 2.5%;
	font-family: "Charm", cursive;
	border-radius: 10px;
	margin-top: 5%;
	border: 2px dashed #4c132c;
	text-align: center;
	:focus {
		outline: none;
	}
`;

//Form Elements

export const NoteForm = styled.form`
	justify-content: space-between;
	align-items: center;
	display: flex;
	flex-flow: column nowrap;
	width: 450px;
`;

export const NoteFormInput = styled.input`
	width: 40%;
	padding: 2.5%;
	font-family: "Charm", cursive;
	border-radius: 10px;
	margin-top: 5%;
	border: 2px dashed #4c132c;
	text-align: center;
	:focus {
		outline: none;
	}
`;

export const Textarea = styled.textarea`
	width: 100%;
	padding: 10%;
	font-family: "Charm", cursive;
	border-radius: 10px;
	border: 2px dashed #4c132c;
	text-align: center;
	margin-top: 5%;
	:focus {
		outline: none;
	}
`;

//Buttons

export const ButtonContainer = styled.div`
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-around;
	align-items: center;
	width: 50%;
`;

export const Button = styled.button`
	font-family: "Charm", cursive;
	text-decoration: none;
	font-size: 1.6rem;
	color: white;
	padding: ${(props) => (props.component === "form" ? "2.5%" : "5%")};
	margin: ${(props) => (props.component === "single" ? "2.5%" : "5% 1%")};
	border: 2px solid #ffffff;
	border-radius: 10px;
	width: 200px;
	background: #4c132c;
	font-weight: bold;
	text-align: center;
	:hover {
		animation: ${pulse} 1s infinite;
		background: white;
		color: #4c132c;
		border: 2px dashed #4c132c;
		cursor: pointer;
	}
	:focus {
		outline: none;
	}
`;

export const ActionContainer = styled.div`
	border: 1px solid red;
	width: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const StyledCSVLink = styled(CSVLink)`
	fontSize: 1rem;
				color: white;
				textDecoration: none;
				fontFamily: ""Charm", cursive;

`;

