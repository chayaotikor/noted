import React from "react";
import {
	Section,
	H2,
	H1,
	NoteListSection,
	Button,
	SearchContainer,
	SearchInput,
	ButtonContainer,
} from "../style";
import { CSVComponent } from "../components/CSVComponent";

import { Link } from "react-router-dom";

export const ListView = (props) => {
	return (
		<>
			<H1>Noted</H1>
			<SearchContainer onSubmit={(event) => props.search(event)}>
				<SearchInput
					name="searchTerm"
					onChange={(e) => props.handleChange(e)}
					placeholder={"search notes..."}
					type="text"
				/>
			</SearchContainer>

			<NoteListSection>
				{props.notes.map((note, index) =>
					index < 9 ? (
						<Link
							to={`/notes/${note.id}`}
							key={index}
							style={{ textDecoration: "none" }}
						>
							<Section>
								<H2 component="list">{note.title}</H2>
							</Section>
						</Link>
					) : null
				)}
			</NoteListSection>
			<H2 onClick={props.sort} sort>
				Sort
			</H2>
			<ButtonContainer>
				<Button
					onClick={(event) => {
						event.preventDefault();
						props.toggleMode("default");
						props.history.push("/notes");
					}}
				>
					View All Notes
				</Button>

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
					<CSVComponent notes={props.notes} />
		</>
	);
};
