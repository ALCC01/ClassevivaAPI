'use strict';
const express = require('express'),
	config = require('./config.json'),
	api = require('./index.js'),
	app = express(),
	sessions = {};

app.get('/', function (req, res) {
	res.send({status: 'OK'})
});

app.get('/login', (req, res) => {
	api.login({
		usercode: req.query.usercode,
		password: req.query.password,
		custcode: req.query.custcode,
		pin: req.query.pin
	}).then(session => {
		sessions[session.sessionId] = session;
		res.send({status: 'OK', sessionId: session.sessionId})
	}, error => {
		res.send({status: 'error', error: error.message})
	});
});

app.get('/:sessionId/', (req, res) => {
	var session = sessions[req.params.sessionId];
	if (session) {
		session.profile().then(result => {
				res.send({status: 'OK', profile: result})
			}, error => {
				res.send({status: 'error', error: error.message})
			}
		)
	} else {
		res.send({status: 'error', error: 'Unregistered session ID'})
	}
});

app.get('/:sessionId/grades', (req, res) => {
	var session = sessions[req.params.sessionId];
	if (session) {
		session.grades().then(result => {
			res.send({status: 'OK', grades: result})
		}, error => {
			res.send({status: 'error', error: error.message})
		})
	} else {
		res.send({status: 'error', error: 'Unregistered session ID'})
	}
});

app.get('/:sessionId/agenda', (req, res) => {
	var session = sessions[req.params.sessionId];
	if (session) {
		session.grades(req.query.start, req.query.end).then(result => {
			res.send({status: 'OK', agenda: result})
		}, error => {
			res.send({status: 'error', error: error.message})
		})
	} else {
		res.send({status: 'error', error: 'Unregistered session ID'})
	}
});

app.get('/:sessionId/files', (req, res) => {
	var session = sessions[req.params.sessionId];
	if (session) {
		session.files().then(result => {
			res.send({status: 'OK', files: result})
		}, error => {
			res.send({status: 'error', error: error.message})
		})
	} else {
		res.send({status: 'error', error: 'Unregistered session ID'})
	}
});

app.get('/:sessionId/logout', (req, res) => {
	var session = sessions[req.params.sessionId];
	if (session) {
		delete sessions[req.params.sessionId];
	} else {
		res.send({status: 'error', error: 'Unregistered session ID'})
	}
});

var server = app.listen(process.env.PORT || config.port || 8080, () => {
	var port = server.address().port;
	console.log(`Classeviva API listening on port ${port}`);
});
