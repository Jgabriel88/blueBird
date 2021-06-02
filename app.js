const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.send('Connected to /');
});

app.listen(3000);
