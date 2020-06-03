const express = require("express");
const router = express.Router();
const db = require("../data/helpers/notesHelper");
const responseStatus = require("../config/responseStatuses");

router.get("/", async (req, res, next) => {
	try {
		const notes = await db.getAll();
		res.status(responseStatus.successful).json({ notes });
    } catch (err) {
        console.log(err)
		next(err);
	}
});

router.get("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const note = await db.getNote(id);
		res.status(responseStatus.successful).json({ note });
	} catch (err) {
		if (TypeError) {
			console.log(err);
			next(responseStatus.notFound);
        } else {
            console.log(err);
			next(err);
		}
	}
});

router.post("/", async (req, res, next) => {
	const { body } = req;
	console.log(body);
	try {
		const newNoteID = await db.addNote(body);
		res.status(responseStatus.created).json({ newNoteID });
    } catch (err) {
        console.log(err);
		next(err);
	}
});

router.put("/:id", async (req, res, next) => {
	const { id } = req.params;
	const { body } = req;
	try {
		const updatedRecords = await db.updateNote(id, body);
		res.status(responseStatus.successful).json({ updatedRecords });
    } catch (err) {
        console.log(err);
		next(err);
	}
});

router.delete("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const deletedRecords = await db.deleteNote(id);
		res.status(responseStatus.successful).json({ deletedRecords });
    } catch (err) {
        console.log(err);
		next(err);
	}
});

module.exports = router;
