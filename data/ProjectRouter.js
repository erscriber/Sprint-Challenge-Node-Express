const express = require('express');
const projectDb = require('./helpers/projectModel.js');
const router = express.Router();

// CRUD OPERATORS
// POST - CREATE
router.post('/', async (req, res) => {
	const { name, description } = req.body;
	try {
		if(name && description) {
			const project = await projectDb.insert({ name, description });
			res
				.status(201)
				.json(project);
		}
		else {
			res
				.status(404)
				.json({ message: "Name and description for project are required." });
		}
	}
	catch (err) {
		res
			.status(500)
			.json({ err: "There was an error while saving the project to the database." });
	}
});

// GET - READ
router.get('/', async (req, res) => {
	try {
		const projects = await projectDb.get();
		res
			.status(200)
			.json(projects);
	}
	catch (err) {
		res
			.status(500)
			.json({ error: "The project information could not be retrieved." });
	}
});

// GET PROJECT ACTIONS
router.get('/:id', async (req, res) => {
	try {
		const projectActions = await projectDb.getProjectActions(req.params.id);
		if (projectActions) {
			res
				.json(projectActions);
		}
		else {
			res
				.status(400)
				.json({ message: "No actions for this project" });
		}
	}
	catch (err) {
		res
			.status(500)
			.json({ err: "Actions could not be retrieved." });
	}
});


// PUT - UPDATE
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const newProject = req.body;
	projectDb
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
		const project = await projectDb.remove(req.params.id);
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
});

module.exports = router;
