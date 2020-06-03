const notesHelper = require("../notesHelper.js");

describe("GET query to notes db", () => {
	it("should return all 50 notes", async (done) => {
		const allNotes = await notesHelper.getAll();
		expect(allNotes).toHaveLength(50);
		done();
	});

	it("should return 1 note", async (done) => {
		const note = await notesHelper.getNote(20);
		expect(Object.keys(note).sort()).toEqual(
			["id", "title", "textBody", "createdAt", "updatedAt"].sort()
		);
		done();
	});
});

describe("INSERT query to notes db", () => {
	it("should add notes with specified ID", async (done) => {
		const id = await notesHelper.addNote({
            title: "Groomers",
            textBody: "Take dog to groomers tomorrow."
        });
        
        const newNote = await notesHelper.getNote(id);
		expect(newNote.title).toEqual("Groomers");
		done();
	});
});

describe("UPDATE query to notes db", () => {
	it("should update note with specified ID", async (done) => {
		notesHelper.updateNote(52, {
			title: "Lawn Mower",
			textBody: "Fix Lawn Mower.",
		});
		const updated = await notesHelper.getNote(52);

		expect(updated.title).toEqual("Lawn Mower");
		done();
	});
});

describe("DELETE query to notes db", () => {
	it("should return a count of 1 when deleting specified note", async (done) => {
		const count = await notesHelper.deleteNote(51);

		expect(count).toEqual(1);
		done();
	});
});
