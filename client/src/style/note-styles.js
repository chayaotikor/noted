import styled from "styled-components";
import xIcon from "./x-icon.png";
import { Link } from "react-router-dom";
import {pulse} from './index'


export const NoteListSection = styled.section`
  background: #fff;
  width: 100%;
  max-height: 65vh;
  min-height: 20vh;
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

export const NoteContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100px;
  height: 100px;
  align-items: flex-end;
  background: #4c132c;
  flex-flow: column nowrap;
  align-items: center;
  position: relative;
  justify-content: stretch;
  position: relative;
  border-radius: 10%;
  margin: 1% 0;
`;

export const NoteLink = styled(Link)`
  overflow: hidden;
  z-index: 1;
  text-decoration: none;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  padding: 5%;
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

export const DeleteButton = styled.button`
  width: 50%;
  z-index: 80;
  font-size: 1.6rem;
  position: absolute;
  border: none;
  border-radius: 50%;
  top: 0;
  right: 0;
  margin: 1rem;
  height: 1.6rem;
  width: 1.6rem;
  background: none;
  background-color: #4c132c;
  background-image: url(${xIcon});
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  :hover {
    cursor: pointer;
  }
`;

export const ModalDiv = styled.div`
  z-index: 100;
  opacity: 1;
  border: 1px solid white;
  border-radius: 10px;
  background: #ffaf9c;
  width: 90%;
  max-width: 400px;
  margin: 0;
  padding: 2.5% 0;
  display: ${(props) => (props.modal ? "flex" : "none")};
  justify-content: space-around;
  align-items: center;
  flex-flow: column wrap;
  position: absolute;
  -webkit-box-shadow: 0px 0px 300px 200px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 300px 200px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 300px 200px rgba(0, 0, 0, 0.75);
`;