# blueBird

Bluebird is an twitter backend clone

## Behavioural Requirements

- User can create a new user with a single username and email
- A logged user can create, remove, update, and delete a tweet
- A logged user can logout

## Technical Specifications

- [Node](https://nodejs.org/en/)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Express](https://expressjs.com/)
- [Body-parser](https://www.npmjs.com/package/body-parser)
- [Express](https://expressjs.com/)
- [Express-session](http://expressjs.com/en/resources/middleware/session.html)
- [Joi](https://www.npmjs.com/package/joi)
- [Mongodb](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Passport](http://www.passportjs.org/)
- [Passport-local](https://www.npmjs.com/package/passport-local)
- [Passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose)

The [Bluebird](https://github.com/Jgabriel88/blueBird) backend application created using [Express](https://expressjs.com/)

## Setup

- Clone the [Bluebird](https://github.com/Jgabriel88/blueBird) repository
- Make sure you are using node version 10.16.1
- Install all modules dependencies by running `npm install`

## Running Webpack Development Server

```
npm start
```

## API Test

### User

![User Registration](https://github.com/Jgabriel88/blueBird/blob/main/images/userRegistration.png?raw=true)

![User Login](https://github.com/Jgabriel88/blueBird/blob/main/images/login.png?raw=true)

![User Logout](https://github.com/Jgabriel88/blueBird/blob/main/images/logout.png?raw=true)

### Tweet

![New Tweet](https://github.com/Jgabriel88/blueBird/blob/main/images/newTweet.png?raw=true)

![Edit Tweet](https://github.com/Jgabriel88/blueBird/blob/main/images/editTweetIncreaseLike.png?raw=true)

![Delete Tweet](https://github.com/Jgabriel88/blueBird/blob/main/images/deleteTweet.png?raw=true)

![View Tweet](https://github.com/Jgabriel88/blueBird/blob/main/images/viewSpecificTweet.png?raw=true)

### Error Handling

![Create Tweet Without All Mandatory Fields](https://github.com/Jgabriel88/blueBird/blob/main/images/errorMandatoryField.png?raw=true)

![Create Tweet Without Being Logged in](https://github.com/Jgabriel88/blueBird/blob/main/images/errorUserNotLogged.png?raw=true)

![Register User Without All Mandatory Fields]()(https://github.com/Jgabriel88/blueBird/blob/main/images/errorUserNotLogged.png?raw=true)

![Logout Without Being Logged in ]()(https://github.com/Jgabriel88/blueBird/blob/main/images/errorUserNotLogged.png?raw=true)
