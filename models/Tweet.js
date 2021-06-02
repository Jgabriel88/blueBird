const mongoose = require('mongoose');

const Schema = mongoose.Schema({
	text: {
		type: String,
		required: true,
	},

	username: {
		type: String,
		required: true,
	},

	likes: {
		type: Number,
		default: 0,
	},

	time: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Tweet', Schema);
