const router = require('express').Router();
const Tweet = require('../models/Tweet');

router.post('/new', async (req, res) => {
	const data = req.body;
	try {
		const respose = await Tweet.insertMany(data);
		res.json({ newId: response._id });
	} catch (err) {
		res.json({ error: err });
	}
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const respose = await Tweet.findById(id);
		res.json({ newId: response });
	} catch (err) {
		res.json({ error: err });
	}
});

module.exports = router;
