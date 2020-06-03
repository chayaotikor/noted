import React from "react";
import { StyledCSVLink } from '../style';

export const CSVComponent = (props) => {
	return (
		<StyledCSVLink
			data={props.notes}
			filename={"notes.csv"}
			target="_blank"
			style={{
				fontSize: "1rem",
				color: "white",
				textDecoration: "none",
				fontFamily: "cursive",
				fontStyle: "italic"
			}}
		>
			Export Notes
		</StyledCSVLink>
	);
};
