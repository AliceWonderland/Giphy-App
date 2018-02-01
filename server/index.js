// SERVER ENTRY FILE


// express routing server
const express = require('express');
const app = express();

// logging middleware
const morgan = require('morgan');
app.use(morgan('dev'));

// static middleware for files in /public
const path = require('path');
app.use(express.static(path.join(__dirname, '../public')));

// parsing middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// routing
const router = require('express').Router();

//api root
router.get('/api', function (req, res, next) {
	res.send('api root');
});

// /api/giphy
router.get('/campuses', function (req, res, next) {
	res.send('something');
});


// end routing



// handle 404s
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

// handle 500s
app.use(function (err, req, res, next) {
	console.error(err);
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// start server
const port = process.env.PORT || 7000;
const srvr = app.listen(port, function () {
	console.log(`Your server, listening on port ${port}`);
	console.log(`Browse to http://localhost:${port} to view your app`);
	console.log(JSON.stringify(srvr.address()));
});