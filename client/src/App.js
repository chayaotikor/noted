import React, { Component } from "react";
import {
  GlobalStyle,
  AppContainer,
  AppHeader,
  SortH2,
  SearchContainer,
  SearchInput,
  SortContainer,
  Button
} from "./style";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  login,
  register,
  requestNotes,
  addNote,
  editNote,
  deleteNote,
  sortAscending,
  sortDescending,
  searching,
} from "./actions";
//Views
import { ListView } from "./views/ListView";

//Components
import { NoteComponent } from "./components/NoteComponent";
import FormComponent from "./components/FormComponent";
import Authentication from "./components/Authentication";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "list",
      searchTerm: "",
      loading: true,
      modal: false,
      deleteId: null
    };
  }

  //Loading
  setLoading = (bool) => {
    this.setState({
      ...this.state,
      loading: bool
    })
  }

  //Modal
  toggleModal = (bool) => {
    console.log('bool', bool)
    this.setState({
      ...this.state,
      modal: bool
    })
  }

  setDeleteId = (id) => {
    this.setState({
      ...this.state,
      deleteId: id
    })
  }
  //Search&Sort Methods
  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
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

  //Auth
  login = (credentials) => {
    this.props.login(credentials);

  };
  register = (credentials) => {
    this.props.register(credentials);
  };
  logout = () => {
    localStorage.clear();
    const token = localStorage.getItem("TOKEN");
    console.log(token);
    this.props.history.push("/auth");
  };

  //Note Methods
  requestNotes = () =>{
      this.props.requestNotes();
  }
  addNote = (note) => {
    this.props.addNote(note);
  };

  editNote = (note, id) => {
    this.props.editNote(note, id);
  };

  deleteNote = () => {

    this.props.deleteNote(this.state.deleteId);
  };

  toggleMode = (mode) => {
    this.setState({
      ...this.state,
      mode,
    });
  };

  render() {
    if (localStorage.getItem("TOKEN") === null) {
      return (
        <>
          <GlobalStyle />
          <AppContainer mode={this.state.mode}>
            <AppHeader mode={this.state.mode}>Noted</AppHeader>
            <Redirect exact from='/' exact to='/auth' />
            <Route
              exact
              path={"/auth"}
              render={(props) => (
                <Authentication
                  {...props}
                  login={this.login}
                  register={this.register}
                />
              )}
            />
          </AppContainer>
        </>
      );
    } else {
      return (
        <>
          <GlobalStyle />
          <AppContainer mode={this.state.mode}>
            <AppHeader mode={this.state.mode}>Noted</AppHeader>

            <SearchContainer
						onSubmit={(event) => this.search(event)}
						mode={this.state.mode}
					>
						<SearchInput
							name="searchTerm"
							onChange={(e) => this.handleChange(e)}
							placeholder={"search notes..."}
							type="text"
						/>
						<SortContainer>
							<SortH2 onClick={this.sortAscending}>Sort A-Z</SortH2>
							<SortH2 onClick={this.sortDescending}>Sort Z-A</SortH2>
						</SortContainer>
					</SearchContainer>
            <Switch>
              <Route
                exact
                path={"/notes"}
                render={(props) => (
                  <ListView
                    requestNotes={this.requestNotes}
                    setID={this.setID}
                    notes={this.props.notes}
                    mode={this.state.mode}
                    toggleMode={this.toggleMode}
                    addNote={this.addNote}
                    id={this.props.match.params.id}
                    handleChange={this.handleChange}
                    sortAscending={this.sortAscending}
                    sortDescending={this.sortDescending}
                    search={this.search}
                    toggleMode={this.toggleMode}
                    deleteNote={this.deleteNote}
                    history={this.props.history}
                    modal={this.state.modal}
                    loading={this.state.loading}
                    setLoading={this.setLoading}
                    deleteId={this.state.deleteId}
                    toggleModal={this.toggleModal}
                    setDeleteId={this.setDeleteId}
                  />
                )}
              />
              <Route
                exact
                path={"/notes/:id/edit"}
                render={(props) => (
                  <FormComponent
                    {...props}
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
                exact
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
            </Switch>
            {/* <Button
            auth
              onClick={(e) => {
                e.preventDefault();
                this.logout();
              }}
            >
              Logout
            </Button> */}
          </AppContainer>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  notes: state.notes,
  newId: state.newId,
});
export default connect(mapStateToProps, {
  login,
  register,
  requestNotes,
  addNote,
  editNote,
  deleteNote,
  sortAscending,
  sortDescending,
  searching,
})(App);
