import React, { Component } from "react";
import { GlobalStyle, AppContainer } from "./style";
import { Route, Switch } from "react-router-dom";
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
  sort,
} from "./actions";

//Components
import { ListPage } from "./components/ListPage";
import { NotePage } from "./components/NotePage";
import SettingsPage from "./components/SettingsPage";
import FormPage from "./components/FormPage";
import AuthPage from "./components/AuthPage";
import { Ticker } from "./components/Ticker";
import { TopBar } from "./components/TopBar";

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
    this.props.sort(e.target.value);
  };

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
  };
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
    if (localStorage.getItem("TOKEN")) {
      return (
        <>
          <GlobalStyle />
          <AppContainer mode={this.props.mode}>
            <TopBar
              sort={this.sort}
              search={this.search}
              mode={this.props.mode}
              toggleMode={this.toggleMode}
              logout={this.logout}
            />
            <Ticker
              message={this.props.message}
              ticker={this.props.ticker}
              error={this.props.error}
            />
            <Switch>
              <Route
                exact
                path={"/notes"}
                render={(props) => (
                  <ListPage
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
                path={"/notes/:id"}
                render={(props) => (
                  <NotePage
                    {...props}
                    toggleMode={this.toggleMode}
                    component="single"
                    getNote={this.getNote}
                    setLoading={this.setLoading}
                    loading={this.props.loading}
                    note={this.props.note}
                    id={this.props.noteId}
                    history={this.history}
                  />
                )}
              />
              <Route
                exact
                path={"/notes/:id/edit"}
                render={(props) => (
                  <FormPage
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
                path={"/form/create"}
                render={(props) => (
                  <FormPage
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
                  <SettingsPage
                    history={props.history}
                    mode={this.props.mode}
                    toggleMode={this.toggleMode}
                    changePassword={this.changePassword}
                    setLoading={this.setLoading}
                  />
                )}
              />
            </Switch>
          </AppContainer>
        </>
      );
    } else {
      return (
        <AuthPage
          login={this.login}
          register={this.register}
          history={this.props.history}
          mode={this.props.mode}
          ticker={this.props.ticker}
          error={this.props.error}
          message={this.props.message}
        />
      );
    }
  }
}

const mapStateToProps = (state) => ({
  notes: state.notes,
  newId: state.newId,
  mode: state.mode,
  modal: state.modal,
  message: state.message,
  ticker: state.ticker,
  error: state.error,
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
