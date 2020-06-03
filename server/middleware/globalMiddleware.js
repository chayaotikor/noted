const helmet = require("helmet");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

module.exports = (server) => {
	//sets HTTP headers appropriately to protect from vulnerabilities
	server.use(helmet());
	//parses the body
	server.use(express.json());
	// short form logging
	server.use(morgan("short"));
	// Cross Origin Resource Sharing (Instead of setting specific URLs, allows requests from anywhere)
	server.use(cors({ credentials: true }));
};
