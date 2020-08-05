import React, { useEffect } from "react";
import {
  NoteContainer,
  NoteLink,
  NoteListSection,
  DeleteButton,
  ModalDiv,
  ListViewContainer
} from "../style/note-styles";

import {
  H2,
  Button,
  ButtonContainer,
  LoadingSpan,
  H1,
} from "../style";

export const ListView = ({
  notes,
  toggleMode,
  requestNotes,
  history,
  loading,
  setLoading,
  modal,
  deleteNote,
  toggleModal,
  setId,
  noteId,
}) => {
  useEffect(() => {
    if (localStorage.getItem("TOKEN") !== null) {
      requestNotes();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [requestNotes, setLoading]);

  if (loading) {
    return <LoadingSpan />;
  } else {
    return (
      <ListViewContainer>

        {notes.length > 0 ? (
          <NoteListSection>
            {notes.map((note, index) => (
              <NoteContainer key={index}>
                  <DeleteButton
                    onClick={(event) => {
                      toggleModal(true);
                      setId(note._id);
                      setLoading(false)
                    }}
                  />
                <NoteLink 
                to={`/notes/${note._id}`}
                onClick={(e) => {
                  toggleMode("single");
                  setId(note._id);
                }}>
                  <H2 component="list">{note.title}</H2>
                </NoteLink>
                </NoteContainer>
            ))}
          </NoteListSection>
        ) : null}
          <ButtonContainer>
          <Button
            onClick={(event) => {
              event.preventDefault();
              toggleMode("create");
              history.push("/form/create");
            }}
          >
            + Create New Note
          </Button>
        </ButtonContainer>
        <ModalDiv modal={modal}>
          <H1 component="delete">Confirm Delete Note</H1>
          <Button
            onClick={(event) => {
              event.preventDefault();
              toggleMode("list");
              toggleModal(false);
              deleteNote(noteId);
            }}
          >
            Delete
          </Button>
          <Button
            onClick={(event) => {
              event.preventDefault();
              toggleMode("list");
              toggleModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalDiv>
      </ListViewContainer>
    );
  }
};
