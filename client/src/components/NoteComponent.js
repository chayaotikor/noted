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
				id={id}
				setLoading={props.setLoading}
				history={props.history}
				title={props.title}
				textBody={props.textBody}
			/>
		);	
	} else {
		return (
			<SingleView
				toggleMode={props.toggleMode}
				component="single"
				getNote={props.getNote}
				setLoading={props.setLoading}
				loading={props.loading}
				note={props.note}
				id={id}
				history={props.history}
			/>
		);
	}
};
