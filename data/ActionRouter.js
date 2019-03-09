const express = require('express');
const actionDb = require('./helpers/actionModel.js');
const router = express.Router();

// CRUD OPERATORS
// POST - CREATE
router.post('/', async (req, res) => {
	const { project_id, description } = req.body;
	try {
		if(project_id && description) {
			const action = await actionDb.insert({ project_id, description });
			res
				.status(201)
				.json(action);
		}
		else {
			res
				.status(404)
				.json({ message: "Project ID and description for action are required." });
		}
	}
	catch (err) {
		res
			.status(500)
			.json({ err: "There was an error while saving the action to the database." });
	}
});

// GET - READ
router.get('/', async (req, res) => {
	try {
		const actions = await actionDb.get();
		res
			.status(200)
			.json(actions);
	}
	catch (err) {
		res
			.status(500)
			.json({ error: "The actions could not be retrieved." });
	}
});


// PUT - UPDATE
/*router.put('/:id', (req, res) => {
	const { id } = req.params;
	const newProject = req.body;
	actionDb
		.update(id, newProject)
		.then(project => {
			if(project) { 
				res
					.json(project);
			}
			else {
				res
					.status(404)
					.json({ error: "Project with specified id not found." })
			}
		})
		.catch(err =>
			res
				.status(500)
				.json({ error: "Failed updating project!" })
		);
});

// DELETE 
router.delete('/:id', async (req, res) => {
	try {
		const project = await actionDb.remove(req.params.id);
		if(project) {
			res.json({ removed: "Your project has been deleted!" });
		}
		else {
			res
				.status(404)
				.json({ message: "The project with specified ID does not exist." });
		}
	}
	catch (err) {
		res
			.status(500)
			.json({ err: "The project could not be removed" });
	}
});*/

module.exports = router;
