const express = require('express');
const router = express.Router();
const asyncCatch = require('../helpers/AsyncCatch');
const ExpressError = require('../helpers/ExpressErrors');
const User = require('../modules/user');
const { userSchema } = require('../schemas'); //joi schema

//validates if a user has all the mandatory fields
const userValidation = (req, res, next) => {
	const { error } = userSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

//create a new user
router.post(
	'/',
	userValidation,
	asyncCatch(async (req, res) => {
		const password = req.body.password;
		const newUser = await User.register(req.body, password);
		await newUser.save();
		res.send(newUser);
	})
);

module.exports = router;
