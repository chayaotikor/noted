import React, { useEffect } from "react";
import {
  NoteContainer,
  NoteLink,
  H2,
  NoteListSection,
  Button,
  DeleteButton,
  ButtonContainer,
  LoadingSpan,
  ModalDiv,
  H1,
} from "../style";

export const ListView = ({
  notes,
  toggleMode,
  requestNotes,
  history,
  loading,
  setLoading,
  match,
  modal,
  deleteNote,
  toggleModal,
  setDeleteId,
  deleteId,
}) => {
  useEffect(() => {
    if (localStorage.getItem("TOKEN") !== null) {
      requestNotes();
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  }, []);

  if (loading) {
    return <LoadingSpan />;
  } else {
    return (
      <>
        {notes ? (
          <NoteListSection>
            {notes.map((note, index) => (
              <NoteContainer>
                  <DeleteButton
                    onClick={(event) => {
                      event.preventDefault();
                      toggleModal(true);
                      setDeleteId(note._id);
                    }}
                  />
                <NoteLink 
                to={`/notes/${note._id}`}
                key={index}
                onClick={(e) => {
                  toggleMode("single");
                }}>
                  <H2 component="list">{note.title}</H2>
                </NoteLink>
                </NoteContainer>
            ))}
          </NoteListSection>
        ) : (
          <h1>No notes, create a new one</h1>
        )}
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
              deleteNote(deleteId);
              setLoading(true);
              toggleMode("list");
              toggleModal(false);
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
      </>
    );
  }
};
