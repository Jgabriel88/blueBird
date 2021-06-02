const User = require('../modules/user');

module.exports.createUser = async (req, res, next) => {
	const { username, name, email, password } = req.body;
	const user = new User({ name, email, username });
	const newUser = await User.register(user, password);
	req.login(newUser, (err) => {
		if (err) return next(err);
	});
	res.send(newUser);
};
