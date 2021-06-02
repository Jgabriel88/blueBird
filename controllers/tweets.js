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

module.exports.editTweet = async (req, res) => {
	const { id } = req.params;
	const tweet = await Tweet.findByIdAndUpdate(id, { ...req.body });
	res.send(tweet);
};

module.exports.deleteTweet = async (req, res) => {
	const { id } = req.params;
	await Tweet.findByIdAndDelete(id);
	res.send(`Tweet id: ${id} DELETED!`);
};
