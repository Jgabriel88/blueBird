const Tweet = require('../modules/tweet');

module.exports.index = async (req, res) => {
	const tweets = await Tweet.find({});
	res.send(`${tweets}`);
};

module.exports.createTweet = async (req, res) => {
	const tweet = new Tweet(req.body);
	tweet.author = req.user._id;
	await tweet.save();
	req.user.tweets.push(tweet._id);
	res.send(tweet);
};