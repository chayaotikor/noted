const faker = require("faker");

const create = () => ({
	title: faker.random.word(),
	textBody: faker.hacker.phrase(),
});

exports.seed = async function (knex, Promise) {
	const notes = [];

	for (let i = 0; i < 50; i++) {
		notes.push(create());
	}

	await knex.raw("TRUNCATE TABLE notes RESTART IDENTITY CASCADE");
	await knex("notes").insert(notes);
};
