require("dotenv").config();
const pg = require("pg");

pg.defaults.ssl = true; //true for production

module.exports = {
	development: {
		client: "pg",
		connection: {
			host: "127.0.0.1",
			user: "cotikor",
			database: "noted_dev",
		},
		migrations: {
			directory: "./server/data/migrations/development",
		},
		seeds: {
			directory: "./server/data/seeds/development",
		},
		useNullAsDefault: true,
	},

	production: {
		client: "pg",
		connection: process.env.DATABASE_URL,
		ssl: true,
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			directory: "./server/data/migrations/production",
		},
		seeds: {
			directory: "./server/data/seeds/production",
		},
	},
};
