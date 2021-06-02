const Joi = require('joi');

module.exports.tweetSchema = Joi.object({
	text: Joi.string().required().min(1).max(280),
	username: Joi.string().required(),
	likes: Joi.number().required().min(0),
	time: Joi.date().required,
});

module.exports.userSchema = Joi.object({
	username: Joi.string().required().min(4).max(15),
	name: Joi.string().required().min(1).max(50),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});
