const router = require('express').Router();

const User = require('../models/User');

router.post('/new', async (req, res) => {
	const data = req.body;
	try {
		const response = await User.insertMany(data);
		res.json({ newId: response._id });
	} catch (err) {
		res.json({ error: err });
	}
});
