const Tweet = require('../modules/tweet');

module.exports.index = async (req, res) => {
	const tweets = await Tweet.find({});
	res.send(`${tweets}`);
};
