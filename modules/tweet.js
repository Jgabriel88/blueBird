const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
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
		required: true,
	},

	time: {
		type: Date,
		default: Date.now,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});

module.exports = mongoose.model('Tweet', TweetSchema);
