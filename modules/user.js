const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},

	name: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
		unique: true,
	},

	password: {
		type: String,
		required: true,
	},

	tweets: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
});

module.exports = mongoose.model('User', UserSchema);
