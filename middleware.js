//avoid user posting a tweet without being logged in
module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		res.send('Please login to post a tweet!');
		return;
	}
	next();
};
