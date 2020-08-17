import React, { Component } from "react";
import { H1, ButtonContainer, Button } from "../style";
import { NoteForm, NoteFormInput, Textarea } from "../style/form-styles";
import { Link } from "react-router-dom";

class FormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {
        title: props.title,
        textBody: props.textBody,
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
      return this.props.addNote(this.state.note);
    } else if (this.props.mode === "edit") {
      return this.props.editNote(this.state.note);
    } else {
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
          placeholder={this.state.note.title}
          onChange={this.handleChange}
        />
        <Textarea
          required
          type="text"
          name="textBody"
          placeholder={this.state.note.textBody}
          rows="10"
          onChange={this.handleChange}
        />
        <ButtonContainer>
          <Link
            to={
              this.props.mode === "edit"
                ? `/notes/${this.state.note._id}`
                : "/notes"
            }
          >
            <Button
              type="submit"
              component="form"
              onClick={(event) => {

                if (this.props.mode === "edit") {
                  this.props.toggleMode("single");
                  this.props.setLoading(true);
                } else {
                  this.props.toggleMode("list");
                  this.props.setLoading(true);
                }
                this.handleMode();
              }}
            >
              {this.props.buttonText}
            </Button>
          </Link>
          <Link
            to={
              this.props.mode === "edit"
                ? `/notes/${this.state.note._id}`
                : "/notes"
            }
          >
            <Button
              onClick={(event) => {
                if (this.props.mode === "edit") {
                  this.props.toggleMode("single");
                  this.props.setLoading(true);
                } else {
                  this.props.toggleMode("list");
                  this.props.setLoading(true);
                }
              }}
              component="form"
            >
              Cancel
            </Button>
          </Link>
        </ButtonContainer>
      </NoteForm>
    );
  }
}

export default FormPage;
