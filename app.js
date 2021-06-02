const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Tweet = require('./modules/tweet');
const morgan = require('morgan');
const asyncCatch = require('./helpers/AsyncCatch');

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
	asyncCatch(async (req, res) => {
		const tweet = new Tweet(req.body);
		await tweet.save();
		res.send(tweet);
	})
);

//edit a tweet
app.put(
	'/tweets/:id',
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

app.use((err, req, res, next) => {
	res.send('Something went wrong');
});

app.listen(3000);
