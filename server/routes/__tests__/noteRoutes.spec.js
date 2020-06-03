const request = require("supertest");
const server = require("../../api/server.js");

describe("notes routes", () => {
	describe("GET all notes", () => {
		it("should return a 200", async () => {
			const response = await request(server).get("/api/notes");
			expect(response.status).toEqual(200);
		});
	});
	describe("GET single note", () => {
		it("should return a correctly shaped note object", async () => {
			const expectedShape = expect.objectContaining({
				note: {
					id: expect.any(Number),
					title: expect.any(String),
					textBody: expect.any(String),
				},
			});
            const response = await request(server).get("/api/notes/20");
            expect(response.status).toEqual(200);
			expect(response.body).toEqual(expectedShape);
		});
	});
	describe("POST note", () => {
		it("should add a note", async () => {
			const note = {
				title: "testing title",
				textBody: "testing text body",
			};
			const response = await request(server).post("/api/notes").send(note);
			expect(response.status).toBe(201);
			expect(response.body).toEqual({ newNoteID: expect.any(Number) });
		});
	});
	describe("PUT note", () => {
		it("should update a note", async () => {
			const note = {
				title: "changed title",
				textBody: "changed text body",
			};
			const response = await request(server).put("/api/notes/1").send(note);
			expect(response.body).toEqual({ updatedRecords: 1 });
		});
	});
	describe("DELETE note", () => {
		it("should delete a note", async () => {
			const response = await request(server).delete("/api/notes/1");
			expect(response.body).toEqual({ deletedRecords: 1 });
		});
	});
});
