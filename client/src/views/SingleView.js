import React from "react";
import { H2, P, ButtonContainer, Button, NoteForm } from "../style";

export const SingleView = (props) => {

	return props.notes.map((note, index) =>
		note.id.toString() === props.id ? (
			<NoteForm key={index}>
				<H2 component="single">{note.title}</H2>
				<P component="single">{note.textBody}</P>
				<ButtonContainer>
					<Button
						component="single"
						onClick={(event) => {
							event.preventDefault();
							props.toggleMode("edit");
						}}
					>
						Edit
					</Button>
					<Button
						onClick={(event) => {
							event.preventDefault();
							props.toggleMode("list");
							props.history.push("/notes");
						}}
						component="form"
					>
						Cancel
					</Button>

				</ButtonContainer>
			</NoteForm>
		) : null
	);
};
