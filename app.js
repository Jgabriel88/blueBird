const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Tweet = require('./modules/tweet');
const User = require('./modules/user');
const morgan = require('morgan');
const { tweetSchema, userSchema } = require('./schemas');
const asyncCatch = require('./helpers/AsyncCatch');
const ExpressError = require('./helpers/ExpressErrors');

mongoose.connect('mongodb://localhost:27017/bluebird', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('connected to the database');
});

app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));

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

const userValidation = (req, res, next) => {
	const { error } = userSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

//get a list of all tweets
app.get(
	'/tweets',
	asyncCatch(async (req, res) => {
		const tweets = await Tweet.find({});
		res.send(`${tweets}`);
	})
);

//get a specific tweet
app.get(
	'/tweets/:id',
	asyncCatch(async (req, res, next) => {
		const { id } = req.params;
		const tweet = await Tweet.findById(id);
		res.send(tweet);
	})
);

//create a new tweet
app.post(
	'/tweets',
	tweetValidation,
	asyncCatch(async (req, res) => {
		const tweet = new Tweet(req.body);
		await tweet.save();
		res.send(tweet);
	})
);

//edit a tweet
app.put(
	'/tweets/:id',
	tweetValidation,
	asyncCatch(async (req, res) => {
		const { id } = req.params;
		const tweet = await Tweet.findByIdAndUpdate(id, { ...req.body });
		res.send(tweet);
	})
);

//delete a tweet
app.delete(
	'/tweets/:id',
	asyncCatch(async (req, res) => {
		const { id } = req.params;
		await Tweet.findByIdAndDelete(id);
		res.send(`Tweet id: ${id} DELETED!`);
	})
);

//create a new user
app.post(
	'/users',
	userValidation,
	asyncCatch(async (req, res) => {
		const user = new User(req.body);
		await user.save();
		res.send(user);
	})
);

//404 handler
app.all('*', (req, res, next) => {
	next(new ExpressError('Page not Found', 404));
});

//error handler
app.use((err, req, res, next) => {
	const { statusCode = 500, message = 'Something went wrong' } = err;
	res.status(statusCode).send(message);
});

app.listen(3000);
