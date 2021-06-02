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

app.get('/posttweet', async (req, res) => {
	const tweet = new Tweet({
		text: 'Test new tweet',
		username: 'Gabriel',
		likes: 25,
	});
	await tweet.save();
	res.send(tweet);
});

app.listen(3000);
