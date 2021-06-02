const express = require('express');
const router = express.Router();
const asyncCatch = require('../helpers/AsyncCatch');
const ExpressError = require('../helpers/ExpressErrors');
const Tweet = require('../modules/tweet');
const { tweetSchema } = require('../schemas'); //joi schema
const { isLoggedIn } = require('../middleware');

//validates if a tweet has all the mandatory fields
const tweetValidation = (req, res, next) => {
	const { error } = tweetSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

//get a list of all tweets
router.get(
	'/',
	asyncCatch(async (req, res) => {
		const tweets = await Tweet.find({});
		res.send(`${tweets}`);
	})
);

//get a specific tweet
router.get(
	'/:id',
	asyncCatch(async (req, res, next) => {
		const { id } = req.params;
		const tweet = await Tweet.findById(id);
		res.send(tweet);
	})
);

//create a new tweet
router.post(
	'/new',
	isLoggedIn,
	tweetValidation,
	asyncCatch(async (req, res) => {
		const tweet = new Tweet(req.body);
		await tweet.save();
		res.send(tweet);
	})
);

//edit a tweet
router.put(
	'/:id/edit',
	tweetValidation,
	asyncCatch(async (req, res) => {
		const { id } = req.params;
		const tweet = await Tweet.findByIdAndUpdate(id, { ...req.body });
		res.send(tweet);
	})
);

//delete a tweet
router.delete(
	'/:id',
	asyncCatch(async (req, res) => {
		const { id } = req.params;
		await Tweet.findByIdAndDelete(id);
		res.send(`Tweet id: ${id} DELETED!`);
	})
);

module.exports = router;
