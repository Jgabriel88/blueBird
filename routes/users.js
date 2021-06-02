const express = require('express');
const passport = require('passport');
const router = express.Router();
const asyncCatch = require('../helpers/AsyncCatch');
const ExpressError = require('../helpers/ExpressErrors');
const User = require('../modules/user');
const { userSchema } = require('../schemas'); //joi schema
const users = require('../controllers/users');

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
router.post('/register', userValidation, asyncCatch(users.createUser));

//login with existent user
router.post(
	'/login',
	passport.authenticate('local', console.log('Wrong credentials')),
	(req, res) => {
		res.send('LOGED');
		console.log(`LOGGED as ${req.body.username}`);
	}
);

router.get('/logout', (req, res) => {
	if (!req.user) {
		res.send('You are not logged.');
		return;
	}
	req.logout();
	res.send('Logged out.');
});

module.exports = router;
