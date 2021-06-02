const router = require('express').Router();
const Tweet = require('../models/Tweet');

router.post('/new', async (req, res) => {
	const data = req.body;
	try {
		const respose = await Tweet.insertMany(data);
		res.json({ newId: response._id });
	} catch (err) {
		res.json(req.body);
	}
});

module.exports = router;
