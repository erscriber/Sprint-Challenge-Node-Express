const express = require('express');
const actionDb = require('./helpers/actionModel.js');
const router = express.Router();

// CRUD OPERATORS
// POST - CREATE
router.post('/', async (req, res) => {
	const { project_id, description} = req.body;
	if(!project_id || !description) {
		res
			.status(400)
			.json({ message: "The project id and description are missing!" })
	}
	try {
		const action = await actionDb.insert(req.params.id, req.body);
			res
				.status(201)
				.json(action);
	}
	catch (err) {
		res
			.status(500)
			.json({ error: "The action information could not be modified." });
	}
});
/*const { project_id, description} = req.body;
	if(!project_id || !description) {
		res
			.status(400)
			.json({ message: "The project id and description are missing!" })
	}
	try {
		const newAction = await actionDb.insert({ project_id, description });
		res
			.json(newAction);
	}
	catch (err) {
		res
			.status(500)
			.json({ error: "The action could not be added. "});
	}
	const { project_id, description } = req.body;
	const newAction = { project_id, description };
	if(!project_id || !description) {
		res
			.status(400)
			.json({ message: "The project id and action description are missing!" })
	}
	else {
		actionDb
			.insert(newAction)
			.then(newAction => res.json(newAction))
			.catch(err => 
				res
					.status(500)
					.json({ error: "Failed adding new project!" })
			);
	}*/
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
router.put('/:id', async (req, res) => {
	try {
		const updateAction = await actionDb.update(req.params.id, req.body);
		if (req.params.id && req.body) {
			if(updateAction) {
				res
					.status(200)
					.json(updateAction);
			}
			else {
				res
					.status(404)
					.json({ message: "The action with the specified ID does not exist." });
			}
		}
		else {
			res
				.status(400)
				.json({ message: "Please provide project id and contents for the post." });
		}
	}
	catch (err) {
		res
			.status(500)
			.json({ error: "The action information could not be modified." });
	}
});

// DELETE 
router.delete('/:id', async (req, res) => {
	try {
		const action = await actionDb.remove(req.params.id);
		if(action) {
			res.json(action);
		}
		else {
			res
				.status(404)
				.json({ message: "The action with specified ID does not exist." });
		}
	}
	catch (err) {
		res
			.status(500)
			.json({ err: "The action could not be removed" });
	}
});

module.exports = router;
