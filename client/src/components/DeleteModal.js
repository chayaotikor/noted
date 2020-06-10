import React from "react";
import { ModalDiv, Button, H1 } from "../style";

export const DeleteModal = (props) => {
	return (
		<ModalDiv>
			<H1 component="delete">Confirm Delete Note</H1>
			<Button
				onClick={(event) => {
					event.preventDefault();
					props.history.push("/");
					props.toggleMode("list");
					props.deleteNote(props.match.params.id);
				}}
			>
				Delete
			</Button>
			<Button
				onClick={(event) => {
					event.preventDefault();
					props.toggleMode("list");
					props.history.push("/");
				}}
			>
				Cancel
			</Button>
		</ModalDiv>
	);
};
