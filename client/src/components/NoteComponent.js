import React from "react";
import FormComponent from "./FormComponent";
import {SingleView} from "../views/SingleView";

export const NoteComponent = (props) => {
	const {id} = props.match.params;
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
	} else {
		return (
			<SingleView
				notes={props.notes}
				toggleMode={props.toggleMode}
				component="single"
				id={id}
				history={props.history}
			/>
		);
	}
};
