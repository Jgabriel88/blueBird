const express = require('express');
const router = express.Router();
const asyncCatch = require('../helpers/AsyncCatch');
const ExpressError = require('../helpers/ExpressErrors');
const Tweet = require('../modules/tweet');
const { tweetSchema } = require('../schemas'); //joi schema
const { isLoggedIn } = require('../middleware');
const tweets = require('../controllers/tweets');

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
router.get('/', asyncCatch(tweets.index));

//get a specific tweet
router.get('/:id', asyncCatch(tweets.getTweetById));
//create a new tweet
router.post(
	'/new',
	isLoggedIn,
	tweetValidation,
	asyncCatch(tweets.createTweet)
);

//edit a tweet
router.put('/:id/edit', tweetValidation, asyncCatch(tweets.editTweet));
//delete a tweet
router.delete('/:id', asyncCatch(tweets.deleteTweet));

module.exports = router;
