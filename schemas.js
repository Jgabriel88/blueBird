const Joi = require('joi');

module.exports.tweetSchema = Joi.object({
	text: Joi.string().required().min(1).max(280),
	username: Joi.string().required(),
	likes: Joi.number().required().min(0),
	time: Joi.date().required,
});
