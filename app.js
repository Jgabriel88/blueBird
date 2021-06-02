const express = require('express');
const app = express();
const mongoose = require('mongoose');

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

app.listen(3000);
