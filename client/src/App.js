import React, { Component } from "react";
import {
  GlobalStyle,
  AppContainer,
  AppHeader,
  SortOption,
  SearchInput,
  SettingsButton,
  SortContainer,
  LogoutButton,
  TopBarContainer,
} from "./style";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  login,
  register,
  changePassword,
  requestNotes,
  addNote,
  editNote,
  deleteNote,
  searching,
  toggleModal,
  toggleMode,
  setId,
  setLoading,
  getNote,
  logout,
  sort
} from "./actions";
//Views
import { ListView } from "./views/ListView";

//Components
import { NoteComponent } from "./components/NoteComponent";
import FormComponent from "./components/FormComponent";
import SettingsView from "./views/SettingsView";
import Authentication from "./components/Authentication";

class App extends Component {
  //Loading
  setLoading = (bool) => {
    this.props.setLoading(bool);
  };

  //Toggle
  toggleModal = (bool) => {
    this.props.toggleModal(bool);
  };

  toggleMode = (mode) => {
    this.props.toggleMode(mode);
  };

  setId = (id) => {
    this.props.setId(id);
  };
  //Search&Sort Methods
  sort = (e) => {
    e.preventDefault();
    this.props.sort(e.target.value)
  }

  sortAscending = () => {
    this.props.sortAscending();
  };
  sortDescending = () => {
    this.props.sortDescending();
  };

  search = (e) => {
    e.preventDefault();
    const newList = this.props.notes.slice().filter((note) => {
      return note.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    if (e.target.value !== "") {
      this.props.searching(newList);
    } else {
      this.props.searching(null);
    }
  };

  //Auth
  login = (credentials) => {
    this.props.login(credentials);
  };
  register = (credentials) => {
    this.props.register(credentials);
  };
  changePassword = (credentials) => {
    this.props.changePassword(credentials);
  }
  logout = () => {
    const message = "Logged out successfully.";
    this.props.logout(message);
  };

  //Note Methods
  requestNotes = () => {
    this.props.requestNotes();
  };

  getNote = (id) => {
    this.props.getNote(id);
  };
  addNote = (note) => {
    this.props.addNote(note);
  };

  editNote = (note) => {
    this.props.editNote(note);
  };

  deleteNote = () => {
    this.props.deleteNote(this.props.noteId);
  };

  render() {
    if (localStorage.getItem("TOKEN") === null) {
      return (
        <>
          <GlobalStyle />
          <AppContainer mode={this.props.mode}>
          <TopBarContainer>
            <AppHeader mode={this.props.mode}>Noted</AppHeader>
          </TopBarContainer>
            <Redirect from="/" exact to="/auth" />
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
          <AppContainer mode={this.props.mode}>
            <TopBarContainer>
              <SettingsButton
                to="/settings"
                onClick={() => {
                  this.toggleMode("settings");
                }}
              />
                <SearchInput
                  onChange={(e) => this.search(e)}
                  placeholder={"search notes..."}
                  type="text"
                  mode={this.props.mode}
                />
              <AppHeader mode={this.props.mode}>Noted</AppHeader>
                <SortContainer mode={this.props.mode}
                defaultValue="sort..."
                onClick={e =>{ e.target.defaultValue = e.target.value; console.log(e.target.defaultValue)}}
                >
                <SortOption value="sort..." disabled hidden>sort...</SortOption>
                  <SortOption value="ascending" onClick={e => this.sort(e)}>Title (Ascending)</SortOption>
                  <SortOption value="descending" onClick={e => this.sort(e)}>Title (Descending)</SortOption>
                  <SortOption value="newest" onClick={e => this.sort(e)}>Date (Newest)</SortOption>
                  <SortOption value="oldest" onClick={e => this.sort(e)}>Date (Oldest)</SortOption>
                </SortContainer>
              <LogoutButton
                to="/auth"
                onClick={() => {
                  this.logout();
                }}
              >
                Logout
              </LogoutButton>
            </TopBarContainer>

            <Switch>
              <Route
                exact
                path={"/notes"}
                render={(props) => (
                  <ListView
                    requestNotes={this.requestNotes}
                    notes={
                      this.props.filteredNotes
                        ? this.props.filteredNotes
                        : this.props.notes
                    }
                    mode={this.props.mode}
                    toggleMode={this.toggleMode}
                    addNote={this.addNote}
                    id={this.props.match.params.id}
                    handleChange={this.handleChange}
                    sortAscending={this.sortAscending}
                    sortDescending={this.sortDescending}
                    search={this.search}
                    deleteNote={this.deleteNote}
                    history={this.props.history}
                    modal={this.props.modal}
                    loading={this.props.loading}
                    setLoading={this.setLoading}
                    noteId={this.props.noteId}
                    toggleModal={this.toggleModal}
                    setId={this.setId}
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
                    mode={this.props.mode}
                    buttonText="Update"
                    toggleMode={this.toggleMode}
                    editNote={this.editNote}
                    match={this.props.match}
                    history={this.props.history}
                    id={this.props.noteId}
                    setLoading={this.setLoading}
                    loading={this.props.loading}
                    title={this.props.title}
                    textBody={this.props.textBody}
                  />
                )}
              />

              <Route
                exact
                path={"/notes/:id"}
                render={(props) => (
                  <NoteComponent
                    {...props}
                    setLoading={this.setLoading}
                    note={this.props.note}
                    toggleMode={this.toggleMode}
                    deleteNote={this.deleteNote}
                    editNote={this.editNote}
                    id={this.props.noteId}
                    mode={this.props.mode}
                    loading={this.props.loading}
                    getNote={this.getNote}
                    title={this.props.title}
                    textBody={this.props.textBody}
                  />
                )}
              />

              <Route
                path={"/form/create"}
                render={(props) => (
                  <FormComponent
                    header={"Create New Note"}
                    mode={this.props.mode}
                    toggleMode={this.toggleMode}
                    buttonText="Save"
                    id={this.props.noteId}
                    setLoading={this.setLoading}
                    addNote={this.addNote}
                  />
                )}
              />
              <Route
                path={"/settings"}
                render={(props) => (
                  <SettingsView
                    history={props.history}
                    mode={this.props.mode}
                    toggleMode={this.toggleMode}
                    changePassword={this.changePassword}
                  />
                )}
              />
            </Switch>
          </AppContainer>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  notes: state.notes,
  newId: state.newId,
  mode: state.mode,
  modal: state.modal,
  noteId: state.currentNote._id,
  title: state.currentNote.title,
  textBody: state.currentNote.textBody,
  loading: state.loading,
  note: state.currentNote,
  filteredNotes: state.filteredNotes,
});
export default connect(mapStateToProps, {
  login,
  logout,
  register,
  changePassword,
  requestNotes,
  addNote,
  editNote,
  deleteNote,
  sort,
  searching,
  toggleModal,
  toggleMode,
  setId,
  setLoading,
  getNote,
})(App);
