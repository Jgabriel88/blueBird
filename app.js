const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Tweet = require('./modules/tweet');
const User = require('./modules/user');
const morgan = require('morgan');
const { tweetSchema, userSchema } = require('./schemas');
const asyncCatch = require('./helpers/AsyncCatch');
const ExpressError = require('./helpers/ExpressErrors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const tweets = require('./routes/tweets');
const users = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/bluebird', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('connected to the database');
});

app.use(morgan('tiny'));

//session configuration
app.use(express.urlencoded({ extended: true }));
const sessionConfiguration = {
	secret: 'secrettohardenerpassword',
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
	},
};

//autenthication handler
app.use(session(sessionConfiguration));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//endpoints middleware
app.use('/tweets', tweets);
app.use('/users', users);

//404 handler
app.all('*', (req, res, next) => {
	next(new ExpressError('Page not Found', 404));
});

//error handler
app.use((err, req, res, next) => {
	const { statusCode = 500, message = 'Something went wrong' } = err;
	res.status(statusCode).send(message);
});

app.listen(3000);
