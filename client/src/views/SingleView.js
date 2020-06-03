import React from "react";
import { H2, P, ButtonContainer, Button } from "../style";

export const SingleView = (props) => {

	return (
			props.notes.map((note, index) => 
				note.id == props.id ? (
					<div key={index}>
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
								component="single"
								onClick={(event) => {
									event.preventDefault();
									props.toggleMode("delete");
								}}
							>
								Delete
							</Button>
						</ButtonContainer>
						</div>
				) : null
			)
	);
};
