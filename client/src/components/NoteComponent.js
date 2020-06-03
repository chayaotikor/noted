import React from "react";
import FormComponent from "./FormComponent";
import {SingleView} from "../views/SingleView";
import {DeleteModal} from "./DeleteModal";

export const NoteComponent = (props) => {
	const id = props.match.params.id;
	if (props.mode === "edit") {
		return (
			<FormComponent
				header={"Update Existing Note"}
				mode={props.mode}
				buttonText="Update"
				toggleMode={props.toggleMode}
				editNote={props.editNote}
				match={props.match}
				id={id}
				history={props.history}
			/>
		);
	} else if (props.mode === "delete") {
		return (
			<>
				<DeleteModal
					id={id}
					toggleMode={props.toggleMode}
					deleteNote={props.deleteNote}
					history={props.history}
				/>

			</>
		);
	} else {
		return (
			<SingleView
				notes={props.notes}
				toggleMode={props.toggleMode}
				component="single"
				id={id}
			/>
		);
	}
};
