import React, { useEffect } from "react";
import { H2, P, ButtonContainer, Button, LoadingSpan } from "../style";
import { NoteForm } from "../style/form-styles";
import { Link } from "react-router-dom";

export const NotePage = ({
  toggleMode,
  note,
  getNote,
  setLoading,
  loading,
  id,
}) => {
  useEffect(() => {
    if (localStorage.getItem("TOKEN") !== null) {
      getNote(id);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [getNote, id, setLoading]);

  if (loading || !note.title || !note.textBody) {
    return <LoadingSpan />;
  } else {
    return (
      <NoteForm>
        <H2 component="single">{note.title}</H2>
        <P component="single">{note.textBody}</P>
        <ButtonContainer>
          <Link to={`/notes/${id}/edit`}>
            <Button
              component="single"
              onClick={(event) => {
                toggleMode("edit");
                setLoading(true);
              }}
            >
              Edit
            </Button>
          </Link>
          <Link to={"/notes"}>
            <Button
              onClick={() => {
                toggleMode("list");
                setLoading(true);
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
