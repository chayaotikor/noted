import React from "react";
import {
	NoteContainer,
	SortH2,
	H2,
	H1,
	NoteListSection,
	Button,
	DeleteButton,
	SearchContainer,
	SearchInput,
	ButtonContainer,
	SortContainer,
} from "../style";
import moment from "moment";

import { Link } from "react-router-dom";

export const ListView = (props) => {
	return (
		<>
			<SearchContainer onSubmit={(event) => props.search(event)}>
				<SearchInput
					name="searchTerm"
					onChange={(e) => props.handleChange(e)}
					placeholder={"search notes..."}
					type="text"
				/>
			</SearchContainer>
			<SortContainer>
				<SortH2 onClick={props.sortAscending}>Sort A-Z</SortH2>
				<SortH2 onClick={props.sortDescending}>Sort Z-A</SortH2>
			</SortContainer>

			<NoteListSection>
				{props.notes.map((note, index) => (
					<Link
						to={`/notes/${note.id}`}
						key={index}
						style={{ textDecoration: "none" }}
					>
						<NoteContainer>
							<H2 component="list">{note.title}</H2>
							<DeleteButton
								onClick={(event) => {
									event.preventDefault();
									props.toggleMode("delete");
								}}
							/>

						</NoteContainer>
					</Link>
				))}
			</NoteListSection>
			<ButtonContainer>
				<Button
					onClick={(event) => {
						event.preventDefault();
						props.toggleMode("create");
						props.history.push("/form/create");
					}}
				>
					+ Create New Note
				</Button>
			</ButtonContainer>
		</>
	);
};
