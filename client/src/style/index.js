import styled, { createGlobalStyle, keyframes } from "styled-components";
import reset from "styled-reset";
import xIcon from "./x-icon.png";
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

//Main Containers
export const AppContainer = styled.main`
	background: #ffaf9c;
	height: 100vh;
	padding: 2.5%;
	position: relative;
	max-width: 600px;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	z-index: 0;
`;

export const AppHeader = styled.h1`
	font-family: "Dancing Script", cursive;
	font-size: 4rem;
	position: absolute;
	top: 0;
	padding: 1% 0;
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
`;

export const ModalDiv = styled.div`
	z-index: 10;
	opacity: 1;
	border-radius: 10px;
	width: 100wv;
	display: flex;
	margin: 2.5%;
	padding: 2.5% 0;
	justify-content: space-around;
	align-items: center;
	flex-flow: column wrap;
`;

export const NoteListSection = styled.section`
	background: #ffeade;
	width: 100%;
	max-height: 65vh;
	display: flex;
	padding: 2.5%;
	overflow-y: scroll;
	justify-content: space-around;
	align-items: center;
	flex-flow: row wrap;
	-webkit-box-shadow: 0px 0px 37px -3px rgba(0, 0, 0, 0.51);
	-moz-box-shadow: 0px 0px 37px -3px rgba(0, 0, 0, 0.51);
	box-shadow: 0px 0px 37px -3px rgba(0, 0, 0, 0.51);
`;

export const NoteContainer = styled.section`
	width: 100px;
	height: 100px;
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
	color: #fff;

	:hover {
		animation: ${pulse} 1s infinite;
		background: white;
		color: #4c132c;
		border: 2px dashed #4c132c;
		border-radius: 10%;
		cursor: pointer;
		-webkit-box-shadow: 0px 0px 37px -3px rgba(0, 0, 0, 0.51);
		-moz-box-shadow: 0px 0px 37px -3px rgba(0, 0, 0, 0.51);
		box-shadow: 0px 0px 37px -3px rgba(0, 0, 0, 0.51);
	}
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
	font-family: 'Montserrat', sans-serif;
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
	font-family: 'Montserrat', sans-serif;
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

//Search Elements
export const SearchContainer = styled.form`
	justify-content: space-between;
	align-items: center;
	display: ${(props) => (props.mode === "list" ? "flex" : "none")};
	flex-flow: column nowrap;
	width: 100%;
	padding: 2.5% 0 0;
`;

export const SearchInput = styled.input`
	width: 100%;
	padding: 2.5%;
	font-family: 'Montserrat', sans-serif;
	border-radius: 10px;
	margin-top: 5%;
	border: 2px dashed #4c132c;
	text-align: center;
	:focus {
		outline: none;
	}
`;

//Sort Elements
export const SortContainer = styled.div`
	display: flex;
	width: 80%;
	padding: 2.5%;
	justify-content: space-between;
	align-items: center;
`;

export const SortH2 = styled.h2`
	font-family: 'Montserrat', sans-serif;
	text-align: center;
	font-size: 1.4rem;
	color: #4c132c;
	cursor: pointer;
	:hover {
		color: "#FFF";
		font-weight: bold;
	}
`;

//Form Elements

export const NoteForm = styled.form`
justify-content: space-between;
	align-items: center;
	display: flex;
	flex-flow: column nowrap;
	width: 90vw;
	max-width: 600px;
`;

export const NoteFormInput = styled.input`
	width: 70%;
	padding: 2.5%;
	font-family: 'Montserrat', sans-serif;
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
	font-family: 'Montserrat', sans-serif;
	border-radius: 10px;
	border: 2px dashed #4c132c;
	text-align: center;
	margin-top: 2.5%;
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
	margin-top: 5%;
`;

export const Button = styled.button`
	font-family: 'Montserrat', sans-serif;
	text-decoration: none;
	font-size: 1.6rem;
	color: white;
	padding: 2.5%;
	margin: 2.5% 1%;
	border: none;
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
		-webkit-box-shadow: 0px 0px 37px -3px rgba(0, 0, 0, 0.51);
		-moz-box-shadow: 0px 0px 37px -3px rgba(0, 0, 0, 0.51);
		box-shadow: 0px 0px 37px -3px rgba(0, 0, 0, 0.51);
	}
	:focus {
		outline: none;
	}
`;

export const DeleteButton = styled.button`
	position: absolute;
	right: 5px;
	top: 5px;
	background-color: #4c132c;
	border: none;
	border-radius: 50%;
	background-position: center;
	background-repeat: no-repeat;
	background-image: url(${xIcon});
	height: 16px;
	width: 16px;
	cursor: pointer;
	:hover {
		50% {
			transform: scale(1.1);
		}
	}
`;
