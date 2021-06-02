const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Tweet = require('./modules/tweet');

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

app.use(express.urlencoded({ extended: true }));

//get a list of all tweets
app.get('/tweets', async (req, res) => {
	const tweets = await Tweet.find({});
	res.send(`${tweets}`);
});

//get a specific tweet
app.get('/tweets/:id', async (req, res) => {
	id = req.params.id;
	const tweet = await Tweet.findById(id);
	res.send(`${tweet}`);
});

//create a new tweet
app.post('/tweets', async (req, res) => {
	const tweet = new Tweet(req.body);
	await tweet.save();
	res.send(tweet);
});

app.listen(3000);
