import React, { Component } from "react";
import {
	NoteForm,
	H1,
	NoteFormInput,
	Textarea,
	ButtonContainer,
	Button,
} from "../style";

class FormComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			note: {
				title: "",
				textBody: "",
				_id: props.id,
			},
		};
	}

	handleChange = (event) => {
		event.preventDefault();
		this.setState({
			note: {
				...this.state.note,
				[event.target.name]: event.target.value,
			},
		});
	};

	handleMode = () => {
		if (this.props.mode === "create") {
			this.props.toggleMode("list");
			this.props.history.push(`/notes`);
			return this.props.addNote(this.state.note);
		} else if (this.props.mode === "edit") {
			this.props.toggleMode("list");
			this.props.history.push(`/notes`);
			return this.props.editNote(this.state.note);
		} else {
			this.props.toggleMode("list");
			return null;
		}
	};

	render() {
		return (
			<NoteForm
				onSubmit={(event) => {
					event.preventDefault();
					this.handleMode();
				}}
			>
				<H1>{this.props.header}</H1>
				<NoteFormInput
					required
					type="text"
					name="title"
					placeholder="Note Title..."
					onChange={this.handleChange}
				/>
				<Textarea
					required
					type="text"
					name="textBody"
					placeholder="Note Content..."
					rows="10"
					onChange={this.handleChange}
				/>
				<ButtonContainer>
					<Button type="submit" component="form">
						{this.props.buttonText}
					</Button>
					<Button
						onClick={(event) => {
							event.preventDefault();
							if (this.props.mode === "edit") {
								this.props.toggleMode("single");
								this.props.history.push(`/notes/${this.props.id}`);
							} else {
								this.props.toggleMode("list");
								this.props.history.push(`/notes`);
							}
						}}
						component="form"
					>
						Cancel
					</Button>
				</ButtonContainer>
			</NoteForm>
		);
	}
}

export default FormComponent;
