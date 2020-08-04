import styled from "styled-components";

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
  font-family: "Montserrat", sans-serif;
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
  font-family: "Montserrat", sans-serif;
  border-radius: 10px;
  border: 2px dashed #4c132c;
  text-align: center;
  margin-top: 2.5%;
  :focus {
    outline: none;
  }
`;