import React, {useEffect} from "react";
import {
	NoteContainer,
	H2,
	NoteListSection,
	Button,
	DeleteButton,
	ButtonContainer,
} from "../style";
import { Link } from "react-router-dom";

export const ListView = (props) => {
	useEffect(() => {
		if(localStorage.getItem('TOKEN') !== null){
		  props.requestNotes();
		}
		}, [])
		return (
			<>
				<NoteListSection>
					{props.notes.map((note, index) => (
						<Link
							to={`/notes/${note.id}`}
							key={index}
							style={{ textDecoration: "none" }}
							onClick={(event) => {
								props.toggleMode("single");
							}}
						>
							<NoteContainer>
								<H2 component="list">{note.title}</H2>
								<DeleteButton
									onClick={(event) => {
										event.preventDefault();
										props.toggleMode("delete");
										props.history.push(`/notes/${note.id}/delete`);
									}}
								/>
							</NoteContainer>
						</Link>
					))}
				</NoteListSection>
				<ButtonContainer>
					<Button
						onClick={(event) => {
							event.preventDefault();
							props.toggleMode("create");
							props.history.push("/form/create");
						}}
					>
						+ Create New Note
				</Button>
				</ButtonContainer>
			</>
		);
};
