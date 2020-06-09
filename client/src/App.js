import React, { Component } from "react";
import { GlobalStyle, AppContainer, AppHeader } from "./style";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import {
	requestNotes,
	addNote,
	editNote,
	deleteNote,
	sortAscending,
	sortDescending,
	searching
} from "./actions";
//Views
import { ListView } from "./views/ListView";

//Components
import { NoteComponent } from "./components/NoteComponent";
import { DeleteModal } from "./components/DeleteModal";
import FormComponent from "./components/FormComponent";


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: "default",
			searchTerm: ""
		};
	}

	componentDidMount() {
		this.props.requestNotes();
		// console.log("requesting....");
	}

	//Search Methods
	handleChange = (event) => {
		event.preventDefault();
		this.setState({
			...this.state,
			[event.target.name]: event.target.value
		});
		if (event.target.value.length === 0) {
			this.props.requestNotes();
		}
	};

	sortAscending = () => {
		this.props.sortAscending();
	};
	sortDescending = () => {
		this.props.sortDescending();
	};

	search = (e) => {
		e.preventDefault();
		console.log(this.state.searchTerm);
		this.props.searching(this.state.searchTerm);
	};

	//Note Methods
	addNote = (note) => {
		this.props.addNote(note);
	};

	editNote = (note, id) => {
		this.props.editNote(note, id);
	};

	deleteNote = (id) => {
		this.props.deleteNote(id);
	};

	toggleMode = (mode) => {
		this.setState({
			...this.state,
			mode
		});
	};

	render() {
		return (
			<>
				<GlobalStyle />
				<AppContainer mode={this.state.mode}>
					<AppHeader>Noted</AppHeader>
					<Route
						path={"/notes/:id/edit"}
						render={(props) => (
							<FormComponent
								header={"Update Existing Note"}
								mode={this.state.mode}
								buttonText="Update"
								toggleMode={this.toggleMode}
								editNote={this.editNote}
								match={this.props.match}
								id={this.props.match.id}
								history={this.props.history}
							/>
						)}
					/>
					<Route
						path={"/notes/:id"}
						render={(props) => (
							<NoteComponent
								{...props}
								notes={this.props.notes}
								toggleMode={this.toggleMode}
								deleteNote={this.deleteNote}
								editNote={this.editNote}
								mode={this.state.mode}
							/>
						)}
					/>
					<Route
						path={"/notes/:id/delete"}
						render={(props) => (
							<DeleteModal
								id={this.props.match.id}
								toggleMode={this.toggleMode}
								deleteNote={this.deleteNote}
								history={this.props.history}
							/>
						)}
					/>
					<Route
						path={"/form/create"}
						render={(props) => (
							<FormComponent
								header={"Create New Note"}
								mode={this.state.mode}
								toggleMode={this.toggleMode}
								buttonText="Save"
								addNote={this.addNote}
								id={this.props.match.params.id}
								history={this.props.history}
							/>
						)}
					/>
					<Route
						exact
						path={"/"}
						render={(props) => (
							<ListView
								notes={this.props.notes}
								mode={this.state.mode}
								toggleMode={this.toggleMode}
								addNote={this.addNote}
								id={this.props.match.params.id}
								handleChange={this.handleChange}
								sortAscending={this.sortAscending}
								sortDescending={this.sortDescending}
								search={this.search}
								history={this.props.history}
							/>
						)}
					/>
				</AppContainer>
			</>
		);
	}
}

const mapStateToProps = (state) => ({
	notes: state.notes,
	requestingData: state.requestingData,
	newId: state.newId
});
export default connect(
	mapStateToProps,
	{
		requestNotes,
		addNote,
		editNote,
		deleteNote,
		sortAscending,
		sortDescending,
		searching
	}
)(App);
