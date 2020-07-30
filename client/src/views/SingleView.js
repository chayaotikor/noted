import React, { useEffect } from "react";
import {
  H2,
  P,
  ButtonContainer,
  Button,
  NoteForm,
  LoadingSpan,
} from "../style";
import { Link } from "react-router-dom";

export const SingleView = ({
  toggleMode,
  note,
  history,
  getNote,
  setLoading,
  loading,
  id
}) => {
  useEffect(() => {
    if (localStorage.getItem("TOKEN") !== null) {
      getNote(id);
      setTimeout(() => {
        setLoading(false);
	  }, 2000);
    }
  }, []);

  if (loading || !note.title || !note.textBody) {
	  console.log(note, loading)
    return <LoadingSpan />;
  } else {
    return (
      <NoteForm>
        <H2 component="single">{note.title}</H2>
        <P component="single">{note.textBody}</P>
        <ButtonContainer>
          <Button
            component="single"
            onClick={(event) => {
              event.preventDefault();
              toggleMode("edit");
            }}
          >
            Edit
          </Button>
		  <Link to={'/notes'}>
          <Button
            onClick={() => {
			  toggleMode("list");
			  setLoading(true)
            }}
            component="form"
          >
            Cancel
          </Button>
		  </Link>
        </ButtonContainer>
      </NoteForm>
    );
  }
};
