const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const tweet = require('./api/tweet');
const user = require('./api/user');
const app = express();

app.use(bodyParser.json());
app.use('/tweet', tweet);
app.use('/user', user);

mongoose.connect('mongodb://localhost:27017/twitter', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('connected to the database');
});

app.get('/', (req, res) => {
	res.send('Connected to /');
});

app.listen(3000);
